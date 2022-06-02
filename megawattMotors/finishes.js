module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get finish records from the Finishes table */
    function getFinishes(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Finishes", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.finishes = results;
                complete()
            }
        })
    }

    /* Find finish records that start with the given string in the req */
    function searchFinish(req, res, mysql, context, complete) {
        let query = "SELECT * from Finishes WHERE Finishes.finish_title LIKE " + mysql.pool.escape(req.params.f + '%')
        mysql.pool.query(query, function(error, results, fields) {
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.finishes = results;
            complete()
        })
    }

    /* Display all finishes records from the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["searchfinish.js", "deletefinish.js"];
        let mysql = req.app.get('mysql')
        getFinishes(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('finishes', context)
            }
        }
    })

    /* Display all finishes that start with a given string */
    router.get('/search/:f', function(req, res) {
        let callbackCount = 0
        let context = {}
        context.jsscripts = ["searchfinish.js", "deletefinish.js"];
        let mysql = req.app.get('mysql');
        searchFinish(req, res, mysql, context, complete)
        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render('finishes', context)
            }
        }
    })

    /* Add finish record, redirect to the Finish page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Finishes (finish_title, finish_price) VALUES (?, ?)"
        let inserts = [req.body.name,
            req.body.price]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/finishes')
            }
        })
    })

    /* Route to delete a finish record, simply return a 202 status code upon success  */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Finishes WHERE finish_id = ?";
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