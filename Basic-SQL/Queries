-- Given the bsg_planets table created by using the following definition query :
--
-- CREATE TABLE `bsg_planets` (
-- `id` int(11) NOT NULL AUTO_INCREMENT,
-- `name` varchar(255) NOT NULL,
-- `population` bigint(20) DEFAULT NULL,
-- `language` varchar(255) DEFAULT NULL,
-- `capital` varchar(255) DEFAULT NULL,
-- PRIMARY KEY (`id`),
-- UNIQUE KEY `name` (`name`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1
--
-- Write a SQL query to find the population of the planet named 'Caprica' -- 10 points
SELECT population FROM bsg_planets WHERE name = "Caprica"

--------------------------------------------------------------------------------
-- Given the bsg_people table created by using the following definition query :
--
-- CREATE TABLE `bsg_people` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `fname` varchar(255) NOT NULL,
--  `lname` varchar(255) DEFAULT NULL,
--  `homeworld` int(11) DEFAULT NULL,
--  `age` int(11) DEFAULT NULL,
--  PRIMARY KEY (`id`),
--  KEY `homeworld` (`homeworld`),
--  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB
--
--  Find the first name, last name, and age of people from bsg_people whose last name is not 'Adama' - 10 points
SELECT fname, lname, age FROM bsg_people WHERE lname != "Adama"

--------------------------------------------------------------------------------
-- Given the bsg_planets table created by using the following definition query :
--
-- CREATE TABLE `bsg_planets` (
-- `id` int(11) NOT NULL AUTO_INCREMENT,
-- `name` varchar(255) NOT NULL,
-- `population` bigint(20) DEFAULT NULL,
-- `language` varchar(255) DEFAULT NULL,
-- `capital` varchar(255) DEFAULT NULL,
-- PRIMARY KEY (`id`),
-- UNIQUE KEY `name` (`name`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1
--
-- Find the name and population of the planets with a population larger than 2,600,000,000 - 10 points
SELECT name, population FROM bsg_planets WHERE population > 2600000000

--------------------------------------------------------------------------------
-- Given the bsg_people table created by using the following definition query :
--
-- CREATE TABLE `bsg_people` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `fname` varchar(255) NOT NULL,
--  `lname` varchar(255) DEFAULT NULL,
--  `homeworld` int(11) DEFAULT NULL,
--  `age` int(11) DEFAULT NULL,
--  PRIMARY KEY (`id`),
--  KEY `homeworld` (`homeworld`),
--  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB
--
-- Find the first name, last name, and age of people from bsg_people whose age is NULL - 12 points
SELECT fname, lname, age FROM bsg_people WHERE age is NULL

--------------------------------------------------------------------------------
-- Given the bsg_planets table created by using the following definition query :
--
-- CREATE TABLE `bsg_planets` (
-- `id` int(11) NOT NULL AUTO_INCREMENT,
-- `name` varchar(255) NOT NULL,
-- `population` bigint(20) DEFAULT NULL,
-- `language` varchar(255) DEFAULT NULL,
-- `capital` varchar(255) DEFAULT NULL,
-- PRIMARY KEY (`id`),
-- UNIQUE KEY `name` (`name`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1
--
-- Insert information about the planet Mars which has a population of 2, language as "Binary" and "Olympus Mons" as Capital, in bsg_planets. 
-- Then list the row(s), with all the information for that planet. - 12 points
INSERT INTO bsg_planets VALUES (23, 'Mars', 2, 'Binary', 'Olympus Mons');
SELECT * FROM bsg_planets WHERE name = "Mars";

--------------------------------------------------------------------------------
-- Given the bsg_people table created by using the following definition query :
--
-- CREATE TABLE `bsg_people` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `fname` varchar(255) NOT NULL,
--  `lname` varchar(255) DEFAULT NULL,
--  `homeworld` int(11) DEFAULT NULL,
--  `age` int(11) DEFAULT NULL,
--  PRIMARY KEY (`id`),
--  KEY `homeworld` (`homeworld`),
--  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB
--
-- Update age of all those people whose last name is 'Adama' and first name is 'William' to 62 and then print all rows with all the columns which match the
-- same criteria, in a separate query. 
UPDATE bsg_people SET age = 62 WHERE fname = 'William' AND lname = 'Adama';
SELECT * FROM bsg_people WHERE fname = 'William' AND lname = 'Adama' AND age = 62;

--------------------------------------------------------------------------------
-- Given the bsg_people table created by using the following definition query :
--
-- CREATE TABLE `bsg_people` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `fname` varchar(255) NOT NULL,
--  `lname` varchar(255) DEFAULT NULL,
--  `homeworld` int(11) DEFAULT NULL,
--  `age` int(11) DEFAULT NULL,
--  PRIMARY KEY (`id`),
--  KEY `homeworld` (`homeworld`),
--  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB
--

--DELETE FROM bsg_cert_people WHERE pid IN (SELECT id FROM bsg_people WHERE age is NULL);
DELETE FROM bsg_people WHERE age is NULL;
SELECT * FROM bsg_people WHERE age is not NULL; 

--------------------------------------------------------------------------------
-- Create a table with the following columns, named bsg_spaceship
--
--    id - an auto-incrementing integer which is also the primary key
--    name - variable-length string with a max of 255 characters, cannot be null
--    separate_saucer_section - a boolean property which specifies whether or not there is a separate saucer section on the spaceship. This defaults to No.
--    length - integer, cannot be null
--
-- Once you have created the table, run the query "DESCRIBE bsg_spaceship;"

CREATE TABLE bsg_spaceship (
id 	int PRIMARY KEY AUTO_INCREMENT, 
name 	varchar(255) 	NOT NULL,
separate_saucer_section boolean NOT NULL DEFAULT 0, 
length	int NOT NULL);

DESCRIBE bsg_spaceship;
