module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get all features from the CustomFeatures table */
    function getFeatures(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM CustomFeatures", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.customfeatures = results;
                complete()
            }
        })
    }

    /* Display all customer records in the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["deletefeature.js"];
        let mysql = req.app.get('mysql')
        getFeatures(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('customfeatures', context)
            }
        }
    })

    /* Add Custom Feature, redirect to the Custom Feature page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO CustomFeatures (feature_title, feature_price) VALUES (?, ?)"
        let inserts = [req.body.feature_title, 
                        req.body.feature_price]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/customfeatures')
            }
        })
    })

    /* Route to delete a custom feature, simply returns a 202 upon success */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM CustomFeatures WHERE feature_id = ?";
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

    
