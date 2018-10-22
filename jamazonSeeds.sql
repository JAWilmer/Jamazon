USE jamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
("Lite-Brite Magic Screen", "Toys", 14.97, 50), 
("Strawberry Shortcake Berry House Playset", "Toys", 31.99, 50),
("Easy Bake Ultimate Oven", "Toys", 42.46, 50),
("Transformers Rescue Bots, Set of 4", "Toys", 23.99, 50), 
("Garlic Crusher", "Kitchen", 7.99, 50), 
("Quesadilla Maker", "Kitchen", 19.99, 50), 
("Millennium Falcon Waffle Maker", "Kitchen", 49.99, 50),
("Bocce Ball Yard Game", "Outdoors", 28.99, 50),
("Croquet Set", "Outdoors", 31.49, 50), 
("Cornhole Game Set", "Outdoors", 39.99, 50), 
("Ladder Golf Game Set", "Outdoors", 25.62, 50),
("Lawn Dice Game Set", "Outdoors", 21.99, 50);

SELECT 
    *
FROM
    products;