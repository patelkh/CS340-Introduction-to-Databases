module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    /* Get all employees from the Employees table */
    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT employee_id as id, first_name, last_name FROM Employees", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.employees = results;
            complete();
        })
    }

    /* Get all customers from the Customers table */
    function getCustomers(res, mysql, context, complete) {
        mysql.pool.query("SELECT customer_id as id, first_name, last_name FROM Customers", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.customers = results;
            complete();
        })
    }

    /* Get all bodies from the Bodies table */
    function getBodies(res, mysql, context, complete) {
        mysql.pool.query("SELECT body_id as id, body_title FROM Bodies", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.bodies = results;
            complete();
        })
    }

    /* Get all batteries from the Batteries table */
    function getBatteries(res, mysql, context, complete) {
        mysql.pool.query("SELECT battery_id as id, battery_title FROM Batteries", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.batteries = results;
            complete();
        })
    }

    /* Get all finishes from the Finishes table */
    function getFinishes(res, mysql, context, complete) {
        mysql.pool.query("SELECT finish_id as id, finish_title FROM Finishes", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.finishes = results;
            complete();
        })
    }

    /* Get all wheelsets from the Wheelsets table */
    function getWheelsets(res, mysql, context, complete) {
        mysql.pool.query("SELECT wheel_id as id, wheel_title FROM Wheelsets", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.wheelsets = results;
            complete();
        })
    }

    /* Get all orders from the Orders table */
    function getOrders(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Orders", function(error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.orders = results
            complete()
        })
    }

    /* Get all custom features from the CustomFeatures table */
    function getCustomFeatures(res, mysql, context, complete) {
        mysql.pool.query("SELECT feature_id as id, feature_title FROM CustomFeatures", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.customfeatures = results;
            complete();
        })
    }

    /* Get all order featurs from the OrderFeatures table */
    function getOrderFeatures(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM OrderFeatures", function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            }
            context.orderfeatures = results;
            complete();
        })
    } 

    /* Display employees, customers, bodies, batteries, finishes, wheelsets, custom features, orders and order features */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {}
        context.jsscripts = ["deleteorderfeature.js", "deleteorder.js"];
        let mysql = req.app.get('mysql')
        getEmployees(res, mysql, context, complete)
        getCustomers(res, mysql, context, complete)
        getBodies(res, mysql, context, complete)
        getBatteries(res, mysql, context, complete)
        getFinishes(res, mysql, context, complete)
        getWheelsets(res, mysql, context, complete)
        getOrders(res, mysql, context, complete)
        getCustomFeatures(res, mysql, context, complete)
        getOrderFeatures(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 9) {
                res.render('orders', context)
            }
        }
    })

    /* Add an order, redirect to the Order page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Orders (customer_id, referral_id, order_date, delivery_date, order_price, battery_id, body_id, finish_id, wheel_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        if (req.body.referral_id === "") {
            req.body.referral_id = null;
        }
        let inserts = [req.body.customer_id,
                        req.body.referral_id,
                        req.body.order_date,
                        req.body.delivery_date, 
                        req.body.order_price,
                        req.body.battery_id,
                        req.body.body_id,
                        req.body.finish_id,
                        req.body.wheelset_id,
                        ]

        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/orders')
            }
        })
    })

    /* Add custom feature for a given order, redirect to the Order page after adding */
    router.post('/customfeatures', function(req, res) {
        console.log(req.body)
        let mysql = req.app.get('mysql')
        let feature = req.body.custom_features_id
        let order = req.body.order_id
        let sql = "INSERT INTO OrderFeatures (order_id, feature_id) VALUES (?, ?)"
        let inserts = [order, feature]
        sql = mysql.pool.query(sql, inserts, function (error) {
            if (error) {
                console.log(error)
            }
        })
        res.redirect('/orders')
    })

    /* Route to delete a custom feature from an order, simply return a 202 status code upon success */
    router.delete('/:oid/:fid', function(req, res){
        let oid = req.params.oid
        let fid = req.params.fid
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM OrderFeatures WHERE order_id = ? AND feature_id = ?";
        let inserts = [oid, fid];
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

    /* Route to delete an order, simply return a 202 status code upon success */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Orders WHERE order_id = ?";
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
