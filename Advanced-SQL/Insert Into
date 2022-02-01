-- write your queries to insert data here
INSERT INTO client (first_name, last_name, email) VALUES("Sara", "Smith", "smiths@hello.com");
INSERT INTO client (first_name, last_name, email) VALUES("Miguel", "Cabrera", "mc@hello.com");
INSERT INTO client (first_name, last_name, email) VALUES("Bo", "Chan'g", "bochang@hello.com");

INSERT INTO employee (first_name, last_name, start_date, email) VALUES("Ananya", "Jaiswal", DATE "2008-04-10", "ajaiswal@hello.com");
INSERT INTO employee (first_name, last_name, start_date, email) VALUES("Michael", "Fern", DATE "2015-07-19", "michaelf@hello.com");
INSERT INTO employee (first_name, last_name, start_date, email) VALUES("Abdul", "Rehman", DATE "2018-02-27", "rehman@hello.com");

INSERT INTO project (title, comments,  cid) VALUES("Diamond", "Should be done by Jan 2019", (SELECT id FROM client WHERE first_name = "Sara"));
INSERT INTO project (title, comments,  cid) VALUES("Chan'g", "Ongoing maintenance", (SELECT id FROM client WHERE first_name = "Bo"));
INSERT INTO project (title, comments,  cid) VALUES("The Robinson Project", null, (SELECT id FROM client WHERE first_name = "Miguel"));

INSERT INTO works_on (pid, eid, due_date) VALUES((SELECT id FROM project WHERE title = "Chan'g"), (SELECT id FROM employee WHERE first_name = "Ananya"), DATE "2020-11-19");
INSERT INTO works_on (pid, eid, due_date) VALUES((SELECT id FROM project WHERE title = "The Robinson Project"), (SELECT id FROM employee WHERE first_name = "Michael"), DATE "2020-12-05");
INSERT INTO works_on (pid, eid, due_date) VALUES((SELECT id FROM project WHERE title = "Diamond"), (SELECT id FROM employee WHERE first_name = "Abdul"), DATE "2021-01-01");

select * from project;
select * from client;
select * from employee;
select * from works_on;
