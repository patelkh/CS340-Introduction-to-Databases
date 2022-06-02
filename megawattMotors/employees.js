module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get all employees from the Employees table */
    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Employees", function(error, results) {
            if(error) {
                res.write(JSON.stringify(error))
                res.end()
            } else {
                context.employees = results;
                complete()
            }
        })
    }

    /* Display all employee records from the database */
    router.get('/', function(req, res) {
        let callbackCount= 0;
        let context = {}
        context.jsscripts = ["deleteemployee.js"];
        let mysql = req.app.get('mysql')
        getEmployees(res, mysql, context, complete)
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('employees', context)
            }
        }
    })

    /* Add an employee, redirect to the Employee page after adding */
    router.post('/', function(req, res) {
        let mysql = req.app.get('mysql')
        let sql = "INSERT INTO Employees (first_name, last_name, employee_address, city, employee_state, zip_code, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)"
        let inserts = [req.body.first_name, 
                        req.body.last_name,
                        req.body.employee_address,
                        req.body.city,
                        req.body.employee_state,
                        req.body.zip_code,
                        req.body.phone_number]
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error))
                res.end()
            } else {
                res.redirect('/employees')
            }
        })
    })

    /* Route to delete an employee, simply return a 202 code upon success */
    router.delete('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "DELETE FROM Employees WHERE employee_id = ?";
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


 

  
   

    
    
