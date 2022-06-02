-- address and state are reserved word; replaced address with customer_address and state with customer_state
CREATE TABLE Customers (
    customer_id int AUTO_INCREMENT NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    customer_address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    customer_state CHAR(2) NOT NULL,
    zip_code varchar(255) NOT NULL,
    phone_number varchar(255) NOT NULL, 
    PRIMARY KEY (customer_id)
);

-- address and state are reserved word; replaced address with employee_address and state with employee_state
CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT NOT NULL,
    first_name varchar(255) NOT NULL,   
    last_name varchar(255) NOT NULL,
    employee_address varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    employee_state CHAR(2) NOT NULL,
    zip_code varchar(255) NOT NULL,
    phone_number varchar(255) NOT NULL, 
    PRIMARY KEY (employee_id)
);

CREATE TABLE Batteries (
    battery_id INT AUTO_INCREMENT NOT NULL, 
    battery_title varchar(255) NOT NULL,
    battery_price FLOAT(8,2) NOT NULL,
    PRIMARY KEY (battery_id)
);

CREATE TABLE Bodies (
    body_id INT AUTO_INCREMENT NOT NULL,
    body_title varchar(255) NOT NULL,
    body_price FLOAT(8,2) NOT NULL,
    PRIMARY KEY (body_id)
);

CREATE TABLE Finishes (
    finish_id INT AUTO_INCREMENT NOT NULL,
    finish_title varchar(255) NOT NULL,
    finish_price FLOAT(8,2) NOT NULL,
    PRIMARY KEY (finish_id)
);

CREATE TABLE Wheelsets (
    wheel_id INT AUTO_INCREMENT NOT NULL,
    wheel_title varchar(255) NOT NULL,
    wheel_price FLOAT(8,2) NOT NULL,
    PRIMARY KEY (wheel_id)
);

CREATE TABLE CustomFeatures (
    feature_id INT AUTO_INCREMENT NOT NULL,
    feature_title varchar(255) NOT NULL,
    feature_price FLOAT(8,2) NOT NULL,
    PRIMARY KEY (feature_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT NOT NULL,
    referral_id INT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    delivery_date DATE,
    order_price FLOAT(8,2) NOT NULL,
    battery_id INT NOT NULL,
    body_id INT NOT NULL,
    finish_id INT NOT NULL, 
    wheel_id INT NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY fk_employee(referral_id)
    REFERENCES Employees(employee_id),
    FOREIGN KEY fk_customer(customer_id)
    REFERENCES Customers(customer_id)
    ON DELETE CASCADE,
    FOREIGN KEY fk_battery(battery_id)
    REFERENCES Batteries(battery_id),
    FOREIGN KEY fk_body(body_id)
    REFERENCES Bodies(body_id),
    FOREIGN KEY fk_finish(finish_id)
    REFERENCES Finishes(finish_id),
    FOREIGN KEY fk_wheel(wheel_id)
    REFERENCES Wheelsets(wheel_id)
);

CREATE TABLE OrderFeatures (
    order_id INT NOT NULL,
    feature_id INT NOT NULL, 
    PRIMARY KEY (order_id, feature_id),
    FOREIGN KEY fk_order(order_id)
    REFERENCES Orders(order_id)
    ON DELETE CASCADE,
    FOREIGN KEY fk_feature(feature_id)
    REFERENCES CustomFeatures(feature_id)
    ON DELETE CASCADE
);



INSERT INTO Batteries (battery_title, battery_price)
VALUES ('Standard 50 kWh', 0.00);

INSERT INTO Batteries (battery_title, battery_price)
VALUES ('High Output 100 kWh', 5499.99);

INSERT INTO Batteries (battery_title, battery_price)
VALUES ('Max Range  200kWh', 14999.99);


INSERT INTO Bodies (body_title, body_price)
VALUES ('Compact', 0.00);

INSERT INTO Bodies (body_title, body_price)
VALUES ('Utility', 9999.99);

INSERT INTO Bodies (body_title, body_price)
VALUES ('Sport', 14999.99);

INSERT INTO Customers (first_name, last_name, customer_address, city, customer_state, zip_code, phone_number)
VALUES ('John', 'Smith', '1234 Memory Lane', 'Girdwood', 'AK', '986765', '(987) 654-3210');

INSERT INTO Customers (first_name, last_name, customer_address, city, customer_state, zip_code, phone_number)
VALUES ('Kay', 'Patel', '56 Vermont Ave', 'Carson', 'CA', '90627', '(949) 634-1121');

INSERT INTO Customers (first_name, last_name, customer_address, city, customer_state, zip_code, phone_number)
VALUES ('Rosie', 'Verano', '121 Hickory Lane', 'Irvine', 'CA', '92618', '(310) 329-2826');

INSERT INTO Employees (first_name, last_name, employee_address, city, employee_state, zip_code, phone_number)
VALUES ('Sara', 'Petersen', '4400 W 2nd Ave. #205', 'Seattle', 'WA', '97777', '(540) 123-4567');

INSERT INTO Finishes (finish_title, finish_price)
VALUES ('3 Stage Gloss Standard Color Palette', 0.00);

INSERT INTO Finishes (finish_title, finish_price)
VALUES ('3 Stage Gloss Custom Color', 4499.99);

INSERT INTO Finishes (finish_title, finish_price)
VALUES ('2 Stage Rugged Matte Standard Color Palette', 2499.99);

INSERT INTO Finishes (finish_title, finish_price)
VALUES ('2 Stage Rugged Matte Custom Color', 6999.99);

INSERT INTO Wheelsets (wheel_title, wheel_price)
VALUES ('Economy', 0.00);

INSERT INTO Wheelsets (wheel_title, wheel_price)
VALUES ('Sport', 1999.99);

INSERT INTO Wheelsets (wheel_title, wheel_price)
VALUES ('Offroad', 1499.99);

INSERT INTO Wheelsets (wheel_title, wheel_price)
VALUES ('Winter', 1399.99);

INSERT INTO CustomFeatures (feature_title, feature_price)
VALUES ('Moon Roof', 2299.99);

INSERT INTO CustomFeatures (feature_title, feature_price)
VALUES ('Adaptive Suspension', 7999.99);

INSERT INTO CustomFeatures (feature_title, feature_price)
VALUES ('Premium Sound System', 2599.99);

INSERT INTO CustomFeatures (feature_title, feature_price)
VALUES ('Premium Navigation Display', 1299.99);

INSERT INTO CustomFeatures (feature_title, feature_price)
VALUES ('Performance Package', 9999.99);

INSERT INTO Orders (referral_id, customer_id, order_date, delivery_date, order_price, battery_id, body_id, finish_id, wheel_id)
VALUES (NULL, 1, "2021-01-23", "2022-06-29", 50000.00, 1, 1, 1, 1);

INSERT INTO OrderFeatures (order_id, feature_id)
VALUES (1, 1);






