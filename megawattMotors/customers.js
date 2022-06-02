module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get all customer records from the Customer table */
    function getCustomers(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Customers", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.customers = results;
                complete() 
            }
        })
    }
    
    /* Get customer record that matches on the given id */
    function getCustomer(res, id, mysql, context, complete) {
        let sql = "SELECT * FROM Customers WHERE customer_id = ?" 
        let insert = [id]
        mysql.pool.query(sql, insert, function(error, results){
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            } 
            context.customer = results[0]
            complete()
        })
    }

    /* Find customers whose first name starts with a given string in the req */
    function getCustomerWithNameLike(req, res, mysql, context, complete) {

        let query = "SELECT * from Customers WHERE Customers.first_name LIKE " + mysql.pool.escape(req.params.c + '%')
        mysql.pool.query(query, function(error, results, fields) {
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete()
        })
    }

    /* Display all customers in the database */
    router.get('/', function(req, res) {
        let callbackCount= 0; 
        let context = {} 
        context.jsscripts = ["searchcustomer.js", "deletecustomer.js"];
        let mysql = req.app.get('mysql')
        getCustomers(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('customers', context)
            }
        }
    })

    /* Display all customers whose first name starts with a given string */
    router.get('/search/:c', function(req, res) {
        let callbackCount = 0 
        let context = {} 
        context.jsscripts = ["searchcustomer.js", "deletecustomer.js"];
        let mysql = req.app.get('mysql');
        getCustomerWithNameLike(req, res, mysql, context, complete)
        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render('customers', context)
            }
        }
    })
    
    /* Display one customer for the specific purpose of updating a customer */
    router.get('/:customer_id', function(req, res) {
        callbackCount = 0
        let context = {}
        context.jsscripts = ["updatecustomer.js"]
        let mysql = req.app.get('mysql')
        getCustomer(res, req.params.customer_id, mysql, context, complete)
        function complete() {
            callbackCount++
            if (callbackCount >= 1) {
                res.render('updatecustomer', context)
            }
        }
    })

    /* Add a customer, redirect to the Customer page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Customers (first_name, last_name, customer_address, city, customer_state, zip_code, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)"
        let inserts = [req.body.first_name, 
                        req.body.last_name,
                        req.body.customer_address,
                        req.body.city,
                        req.body.customer_state,
                        req.body.zip_code,
                        req.body.phone_number]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/customers')
            }
        })
    })

    /* The URI that update data is sent to in order to update a customer  */
    router.put('/:customer_id', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "UPDATE Customers SET first_name=?, last_name=?, customer_address=?, city=?, customer_state=?, zip_code=?, phone_number=? WHERE customer_id = ?";
        let inserts = [req.body.first_name, 
            req.body.last_name,
            req.body.customer_address,
            req.body.city,
            req.body.customer_state,
            req.body.zip_code,
            req.body.phone_number,
            req.params.customer_id]
        sql = mysql.pool.query(sql, inserts, function(error, results) {
            if (error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.status(200).end()
                
            }
        })
    })
    
    /* Route to delete a customer, simply return a 202 upon success */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Customers WHERE customer_id = ?";
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

    
