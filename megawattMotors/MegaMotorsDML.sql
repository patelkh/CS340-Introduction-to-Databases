-- Add row to customer table
INSERT INTO Customers
(first_name, last_name, customer_address, city, customer_state, zip_code, phone_number) VALUES 
(:first_name, :last_name, :customer_address, :city, :customer_state, :zip_code, :phone_number );
-- Add row to employee table
INSERT INTO Employees 
(first_name, last_name, employee_address, city, employee_state, zip_code, phone_number) VALUES 
(:first_name, :last_name, :employee_address, :city, :employee_state, :zip_code, :phone_number);
-- Add row to Batteries table
INSERT INTO Batteries
(battery_title, battery_price) VALUES
(:battery_title, :battery_price);
-- Add row to Bodies table
INSERT INTO Bodies 
(body_title, body_price) VALUES
(:body_title, :body_price);
-- Add row to Finishes table
INSERT INTO Finishes
(finish_title, finish_price) VALUES
(:finish_title, :finish_price);
-- Add row to Wheelsets table
INSERT INTO Wheelsets
(wheel_title, wheel_price) VALUES 
(:wheel_title, :wheel_price);
-- Add row to CustomFeatures table
INSERT INTO CustomFeatures 
(feature_title, feature_price) VALUES
(:feature_title, :feature_price);
-- Add row to Orders table
INSERT INTO Orders 
(referral_id, customer_id, order_date, delivery_date, order_price, battery_id, body_id, finish_id, wheel_id) VALUES
(:employee_id_from_dropdown_input, :customer_id_from_input, :order_date, :delivery_date, :order_price,
 :battery_id_from_dropdown_input, :body_id_from_dropdown_input, :finish_id_from_dropdown_input,
 :wheel_id_from_dropdown_input);
-- Add row to OrderFeatures table
INSERT INTO OrderFeatures 
(order_id, feature_id) VALUES 
(:order_id_from_orders, :feature_id_from_customsfeatures);
-- Update row in Orders table
UPDATE Orders SET referral_id = :referral_id, customer_id = :customer_id, order_date = :order_date,
                  delivery_date = :delivery_date, order_price = :order_price, battery_id = :battery_id,
                  body_id = :body_id, finish_id = :finish_id, wheel_id = :wheel_id
WHERE order_id = :order_id_update;
-- Update row in OrderFeatures table
UPDATE OrderFeatures SET order_id = :order_id, feature_id = :feature_id
WHERE order_id = :order_id_update AND feature_id = :feature_id_update;
-- Update row in Customers table
UPDATE Customers SET first_name = :first_name_update, last_name = :last_name_update,
                     customer_address = :customer_address_update, city = :city_update,
                     customer_state = :customer_state_update, zip_code = :zip_code_update,
                     phone_number = :phone_number_update
WHERE customer_id = :customer_id_update;
-- Update row in Employees table
UPDATE Employees SET first_name = :first_name_update, last_name = :last_name_update,
                     employee_address = :employee_address_update, city = :city_address_update,
                     employee_state = :employee_state_update, zip_code = :zip_code_update,
                     phone_number = :phone_number_update
WHERE employee_id = :employee_id_update;
-- Update row in Batteries table
UPDATE Batteries SET battery_title = :battery_title_update, battery_price = :battery_price_update
WHERE battery_id = :battery_id_update;
-- Update row in Bodies table
UPDATE Bodies SET body_title = :body_title_update, body_price = :body_price_update
WHERE body_id = :body_id_update;
-- Update row in Finishes table
UPDATE Finishes SET finish_title = :finish_title_update, finish_price = :finish_price_update
WHERE finish_id = :finish_id_update;
-- Update row in Wheelsets table
UPDATE Wheelsets SET wheel_title = :wheel_title_update, wheel_price = :wheel_price_update
WHERE wheel_id = :wheel_id_update;
-- Update row in CustomFeatures table
UPDATE CustomFeatures SET feature_title = :feature_title_update, feature_price = :feature_price_update
WHERE feature_id = :feature_id_update;
-- Search for row in Orders by order_date
SELECT * FROM Orders WHERE order_date = :order_date_search;
-- Search for row in Customers by first_name
SELECT * FROM Customers WHERE first_name = :first_name_search;
-- Search for row in Employees by first_name
SELECT * FROM Employees WHERE first_name = :first_name_search;
-- Search for row in Bodies by body_title
SELECT * from Bodies WHERE body_title = :body_title_search;
-- Search for row in Batteries by battery_title
SELECT * FROM Batteries WHERE battery_title = :battery_title_search;
-- Search for row in Finishes by finish_title
SELECT * FROM Finishes WHERE finish_title = :finish_title_search;
-- Search for row in Wheelsets by wheel_title
SELECT * FROM Wheelsets WHERE wheel_title = :wheel_title_search;
-- Search for row in CustomFeatures by feature_title
SELECT * FROM CustomFeatures WHERE feature_title = :feature_title_search;
-- Delete row in Orders
DELETE FROM Orders WHERE order_date = :order_date_delete;
-- Delete row in Customers
DELETE FROM Customers WHERE first_name = :first_name_delete;
-- Delete row in Employees
DELETE FROM Employees WHERE first_name = :first_name_delete;
-- Delete row in Bodies
DELETE from Bodies WHERE body_title = :body_title_delete;
-- Delete row in Batteries
DELETE FROM Batteries WHERE battery_title = :battery_title_delete;
-- Delete row in Finishes
DELETE FROM Finishes WHERE finish_title = :finish_title_delete;
-- Delete row in Wheelsets
DELETE FROM Wheelsets WHERE wheel_title = :wheel_title_delete;
-- Delete row in CustomFeatures
DELETE FROM CustomFeatures WHERE feature_title = :feature_title_delete;
-- Delete row in OrderFeatures
DELETE FROM OrderFeatures WHERE order_id = ? AND feature_id = ?;
