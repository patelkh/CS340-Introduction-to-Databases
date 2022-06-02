module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get body records from the Bodies table */
    function getBodies(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Bodies", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.bodies = results;
                complete()
            }
        })
    }

    /* Find bodies that start with a given string in the req object */
    function searchBody(req, res, mysql, context, complete) {
        let query = "SELECT * from Bodies WHERE Bodies.body_title LIKE " + mysql.pool.escape(req.params.b + '%')
        mysql.pool.query(query, function(error, results, fields) {
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.bodies = results;
            complete()
        })
    }

    /* Display all bodies in the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["searchbody.js", "deletebody.js"];
        let mysql = req.app.get('mysql')
        getBodies(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('bodies', context)
            }
        }
    })

    /* Display all bodies that start with the given string */
    router.get('/search/:b', function(req, res) {
        let callbackCount = 0
        let context = {}
        context.jsscripts = ["searchbody.js", "deletebody.js"];
        let mysql = req.app.get('mysql');
        searchBody(req, res, mysql, context, complete)
        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render('bodies', context)
            }
        }
    })

    /* Add a body, redirect to the Body page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Bodies (body_title, body_price) VALUES (?, ?)"
        let inserts = [req.body.name,
            req.body.price]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/bodies')
            }
        })
    })


    /* Route to delete a body, simply returns a 202 upon success */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Bodies WHERE body_id = ?";
        let inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();