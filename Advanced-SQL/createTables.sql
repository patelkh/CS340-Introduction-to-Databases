CREATE TABLE client
(	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	first_name varchar(255) NOT NULL, 
	last_name varchar(255) NOT NULL, 
	email varchar(255) NOT NULL,
	CONSTRAINT full_name UNIQUE(first_name, last_name)
);

CREATE TABLE employee 
(	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(255) NOT NULL, 
	last_name varchar(255) NOT NULL,
	start_date date NOT NULL, 
	email varchar(255) NOT NULL,
	CONSTRAINT full_name UNIQUE(first_name, last_name)
);

CREATE TABLE project 
(	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title varchar(255) NOT NULL UNIQUE, 
	comments text,
	cid int(11), 
	FOREIGN KEY (cid) 
	REFERENCES client (id)
);

CREATE TABLE works_on 
(	pid int(11), 
	eid int(11), 
	due_date date NOT NULL,
	PRIMARY KEY (eid, pid),
	FOREIGN KEY (pid) 
	REFERENCES project (id),
	FOREIGN KEY (eid) 
	REFERENCES employee (id)
);


DESCRIBE client;
DESCRIBE employee;
DESCRIBE project;
DESCRIBE works_on;

-- Test that the correct foreign keys were created 
SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_SCHEMA = 'grade';

