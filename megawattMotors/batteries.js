module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get battery records from the Batteries table */
    function getBatteries(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Batteries", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.batteries = results;
                complete()
            }
        })
    }

    /* Find batteries that start with a given string in the req object */ 
    function searchBattery(req, res, mysql, context, complete) {
        let query = "SELECT * from Batteries WHERE Batteries.battery_title LIKE " + mysql.pool.escape(req.params.b + '%')
        mysql.pool.query(query, function(error, results, fields) {
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.batteries = results;
            complete()
        })
    }

    /* Display all batteries in the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["searchbattery.js", "deletebattery.js"];
        let mysql = req.app.get('mysql')
        getBatteries(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('batteries', context)
            }
        }
    })

    /* Display all batteries where the name starts with the given string */ 
    router.get('/search/:b', function(req, res) {
        let callbackCount = 0
        let context = {}
        context.jsscripts = ["searchbattery.js", "deletebattery.js"];
        let mysql = req.app.get('mysql');
        searchBattery(req, res, mysql, context, complete)
        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render('batteries', context)
            }
        }
    })

    /* Add a battery, redirect to the Battery page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Batteries (battery_title, battery_price) VALUES (?, ?)"
        let inserts = [req.body.name,
            req.body.price]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/batteries')
            }
        })
    })

    /* Route to delete a battery, simply returns a 202 upon success  */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Batteries WHERE battery_id = ?";
        var inserts = [req.params.id];
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