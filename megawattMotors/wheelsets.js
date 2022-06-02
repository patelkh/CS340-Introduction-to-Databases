module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get all wheelset records from the Wheelsets table */
    function getWheelsets(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Wheelsets", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.wheelsets = results;
                complete()
            }
        })
    }

    /* Find all wheelsets that start with the given string in the req */
    function searchWheel(req, res, mysql, context, complete) {
        let query = "SELECT * from Wheelsets WHERE Wheelsets.wheel_title LIKE " + mysql.pool.escape(req.params.w + '%')
        mysql.pool.query(query, function(error, results, fields) {
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wheelsets = results;
            complete()
        })
    }

    /* Display all wheelsets records from the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["searchwheel.js", "deletewheelset.js"];
        let mysql = req.app.get('mysql')
        getWheelsets(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('wheelsets', context)
            }
        }
    })

    /* Display all wheelsets records that start with the given string */
    router.get('/search/:w', function(req, res) {
        let callbackCount = 0
        let context = {}
        context.jsscripts = ["searchwheel.js", "deletewheelset.js"];
        let mysql = req.app.get('mysql');
        searchWheel(req, res, mysql, context, complete)
        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render('wheelsets', context)
            }
        }
    })

    /* Add a wheelset record, redirect to the Wheelset page after adding  */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Wheelsets (wheel_title, wheel_price) VALUES (?, ?)"
        let inserts = [req.body.name,
            req.body.price]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/wheelsets')
            }
        })
    })

    /* Route to delete a wheelset record, simply return a 202 status code upon success */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Wheelsets WHERE wheel_id = ?";
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