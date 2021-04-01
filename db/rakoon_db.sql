DROP SCHEMA IF EXISTS rakoon;
CREATE DATABASE IF NOT EXISTS rakoon;

CREATE TABLE IF NOT EXISTS rakoon.Ratings(
  rating_id INT NOT NULL AUTO_INCREMENT,
  comment VARCHAR(300) NOT NULL,
  rate INT NOT NULL,
  is_verified INT DEFAULT 0,
  PRIMARY KEY (rating_id)
);

CREATE TABLE IF NOT EXISTS rakoon.Order_Status(
  order_id INT NOT NULL AUTO_INCREMENT,
  status VARCHAR(10) NOT NULL,
  PRIMARY KEY (order_id)
);

CREATE TABLE IF NOT EXISTS rakoon.User_Roles(
  role_id INT NOT NULL,
  role_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS rakoon.Users(
  user_id INT NOT NULL AUTO_INCREMENT,
  e_mail VARCHAR(30) NOT NULL,
  name VARCHAR(30) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  password VARCHAR(100) NOT NULL,
  address VARCHAR(100),
  reset_token VARCHAR(100),
  role_id INT NOT NULL,
  is_verified INT DEFAULT 0,
  auth VARCHAR(5) DEFAULT 0,
  PRIMARY KEY (user_id),
  FOREIGN KEY (role_id) REFERENCES User_Roles(role_id),
  UNIQUE (e_mail)
);

CREATE TABLE IF NOT EXISTS rakoon.Store(
  store_id INT NOT NULL AUTO_INCREMENT,
  store_name VARCHAR(50) NOT NULL,
  owner_id INT NOT NULL,
  PRIMARY KEY (store_id),
  FOREIGN KEY (owner_id) REFERENCES Users(user_id),
  UNIQUE (store_name)
);

CREATE TABLE IF NOT EXISTS rakoon.Items(
  item_id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  description VARCHAR(2000),
  images VARCHAR(2000),
  prev_img VARCHAR(300),
  category VARCHAR(30) NOT NULL,
  store_id INT NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (store_id) REFERENCES Store(store_id)
);

CREATE TABLE IF NOT EXISTS rakoon.item_img(
	item_id INT,
    image VARCHAR(200),
    isprevimg INT,
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE IF NOT EXISTS rakoon.History(
  date DATE NOT NULL,
  item_id INT NOT NULL,
  user_id INT NOT NULL,
  rating_id INT,
  order_id INT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Items(item_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (rating_id) REFERENCES Ratings(rating_id),
  FOREIGN KEY (order_id) REFERENCES Order_Status(order_id)
);

CREATE TABLE IF NOT EXISTS rakoon.Users_Bucket(
  item_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES Items(item_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

REPLACE INTO rakoon.user_roles(role_id, role_name) VALUES (1,'customer');
REPLACE INTO rakoon.user_roles(role_id, role_name) VALUES (2,'sales_manager');
REPLACE INTO rakoon.user_roles(role_id, role_name) VALUES (3,'product_manager');

REPLACE INTO rakoon.users(role_id, e_mail, password, name, surname) 
	VALUES (1,'karakuz@gmail.com','$2a$10$31CFNHOYGD3f.SfXLkqgZ.hRyQLDPLllmIwAia9MRkwByvrnWIM52', 'Emre', 'Karakuz');
REPLACE INTO rakoon.users(role_id, e_mail, password, name, surname) 
	VALUES (1,'emrekarakuz@gmail.com','$2a$10$zjyE18R/ukiaMywWAoWuHOwEBaQ1nKfLV5KrV8vnH3c5bbSxmgXEm', 'Emre', 'Karakuz');
REPLACE INTO rakoon.users(role_id, e_mail, password, name, surname) 
	VALUES (1,'eray750@hotmail.com','$2a$10$78sUwIgOnJ9JRBMP.0hoa.EHU678dENUON4RMVmBCbE6jpxe59yaa', 'Eray', 'Ozdayioglu');
REPLACE INTO rakoon.users(role_id, e_mail, password, name, surname) 
	VALUES (1,'erayozd22@gmail.com','$2a$10$SilaAlccQHZUAMwjtIPy.e8mSsdY0FNn3/1YjPsHXn65cgibDWBPq', 'Eray', 'Ozdayioglu');
REPLACE INTO rakoon.users(role_id, e_mail, password, name, surname) 
	VALUES (3,'emre.karakuz@ozu.edu.tr','$2a$10$Pz6RfXi09QcOwdg3z/v7LOO8Go8PuWLgPvLRuiq8yzT04nItKItrW', 'Test', 'Seller');

REPLACE INTO rakoon.store(store_name, owner_id) 
	VALUES('Bookworm',5);

REPLACE INTO rakoon.items(item_name, description, store_id, category, price) 
	VALUES ('I Love You to the Moon and Back', 'Test Book', 1, 'Book', 5.0);
REPLACE INTO rakoon.items(item_name, description, store_id, category, price) 
	VALUES ('Our Class is a Family', 'Test Book', 1, 'Book', 6.0);
REPLACE INTO rakoon.items(item_name, description, store_id, category, price) 
	VALUES ('The Vanishing Half: A Novel', 'Test Book', 1, 'Book', 7.0);
REPLACE INTO rakoon.items(item_name, description, store_id, category, price) 
	VALUES ('The Very Hungry Caterpillar', 'Test Book', 1, 'Book', 8.0);
    
REPLACE INTO rakoon.item_img(item_id,image)
	VALUES(1,'https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200.jpg');
REPLACE INTO rakoon.item_img(item_id,image)
	VALUES(2,'https://images-na.ssl-images-amazon.com/images/I/71aLultW5EL._AC_UL200_SR200,200.jpg');
REPLACE INTO rakoon.item_img(item_id,image)
	VALUES(3,'https://images-na.ssl-images-amazon.com/images/I/71e5m7xQd0L._AC_UL200_SR200,200.jpg');
REPLACE INTO rakoon.item_img(item_id,image)
	VALUES(4,'https://images-na.ssl-images-amazon.com/images/I/41tyokViuNL._AC_SX184_.jpg');