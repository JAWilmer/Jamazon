-- SEEDS FOR PRODUCTS------------------------------------------------------
USE jamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)

VALUES 
("Lite-Brite Magic Screen", "Toys", 14.97, 100, 0), 
("Strawberry Shortcake Berry House Playset", "Toys", 31.99, 100, 0),
("Easy Bake Ultimate Oven", "Toys", 42.46, 100, 0),
("Transformers Rescue Bots, Set of 4", "Toys", 23.99, 100, 0), 
("Garlic Crusher", "Kitchen", 7.99, 100, 0), 
("Quesadilla Maker", "Kitchen", 19.99, 100, 0), 
("Millennium Falcon Waffle Maker", "Kitchen", 49.99, 100, 0),
("Bocce Ball Yard Game", "Outdoors", 28.99, 100, 0),
("Croquet Set", "Outdoors", 31.49, 100, 0), 
("Cornhole Game Set", "Outdoors", 39.99, 100, 0), 
("Ladder Golf Game Set", "Outdoors", 25.62, 100, 0),
("Lawn Dice Game Set", "Outdoors", 21.99, 100, 0);

SELECT 
    *
FROM
    products;

--SEEDS FOR DEPARTMENTS-------------------------------------------------------
USE jamazon;

INSERT INTO departments (department_name, over_head_cost, total_sales)

VALUES 
("Toys", 100, 0.75, 0.00), 
("Kitchen", 85.52, 0.00), 
("Outdoors", 125.32, 0.00);

SELECT 
    *
FROM
    departments;

   
