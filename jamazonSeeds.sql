USE jamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
("Lite-Brite Magic Screen", "Toys", 14.97, 10), 
("Strawberry Shortcake Berry House Playset", "Toys", 31.99, 10),
("Easy Bake Ultimate Over", "Toys", 42.46, 10),
("Transformers Rescue Bots, Set of 4", "Toys", 23.99, 10), 
("Garlic Crusher", "Kitchen", 7.99, 10), 
("Quesadilla Maker", "Kitchen", 19.99, 10), 
("Millennium Falcon Waffle Maker", "Kitchen", 49.99, 10),
("Bocce Ball Yard Game", "Outdoors", 28.99, 10),
("Croquet Set", "Outdoors", 31.49, 10), 
("Cornhole Game Set", "Outdoors", 39.99, 10), 
("Ladder Golf Game Set", "Outdoors", 25.62, 10),
("Lawn Dice Game Set", "Outdoors", 21.99, 10);

SELECT 
    *
FROM
    products;