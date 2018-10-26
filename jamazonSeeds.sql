-- SEEDS FOR PRODUCTS------------------------------------------------------
USE jamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
("Lite-Brite Magic Screen", "Toys", 14.97, 100), 
("Strawberry Shortcake Berry House Playset", "Toys", 31.99, 100),
("Easy Bake Ultimate Oven", "Toys", 42.46, 100),
("Transformers Rescue Bots, Set of 4", "Toys", 23.99, 100), 
("Garlic Crusher", "Kitchen", 7.99, 100), 
("Quesadilla Maker", "Kitchen", 19.99, 100), 
("Millennium Falcon Waffle Maker", "Kitchen", 49.99, 100),
("Bocce Ball Yard Game", "Outdoors", 28.99, 100),
("Croquet Set", "Outdoors", 31.49, 100), 
("Cornhole Game Set", "Outdoors", 39.99, 100), 
("Ladder Golf Game Set", "Outdoors", 25.62, 100),
("Lawn Dice Game Set", "Outdoors", 21.99, 100);

SELECT 
    *
FROM
    products;

--SEEDS FOR DEPARTMENTS-------------------------------------------------------
USE jamazon;

INSERT INTO departments (department_name, over_head_cost)

VALUE
("Toys", 75), 
("Kitchen", 95.52), 
("Outdoors", 125.32);

SELECT 
    *
FROM
    departments;

   
