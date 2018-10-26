##JAMAZON## Julie Anne’s Zon Shopping App---
Jamazon is a command line application that uses Node.JS and SQL to create and manipulate a product database. 

__TECHNOLOGY/ FRAMEWORKS USED__---
+ Javascript
+ [Node.js](https://nodejs.org/en/)
+ [MySQL](https://www.mysql.com/)
+ [Inquirer npm](https://www.npmjs.com/package/inquirer)
+ [console.table npm](https://www.npmjs.com/package/console.table)
+ [chalk npm](https://www.npmjs.com/package/chalk)

__DATABASE SET-UP__---
The Jamazon SQL database initially contains two tables: products and departments.  The departments table is initially seeded with 3 departments, “Toys,” “Kitchen,” and “Outdoors.” the products table is initially seeded with 12 items, each item falls in one of the initial three departments defined in the “departments” table. Both the schema to establish the database and tables and table seed files are included in this repository. 

__BASIC FUNCTIONALITY__---
Jamazon function on three levels.  
1. The **customer interface** functions a bit like Amazon. It displays all items in stock, takes customer orders, and depletes the database accordingly.  
1. The **manager interface** allows a “manager” to view products for sale, items with an inventory count less than 100, add stock to any existing inventory, and add a new product to the database. 
1. The **supervisor interface** allows  “supervisors” to view a summary of departments, including product sales and total profit (both calculated with an algorithm), as well as add new departments. 


__JAMAZON IN ACTION__---


__Customer Interface__---
Below Jamazon has been seeded with 12 items available for purchase.  
![Seeded Customer Database](/images/image21.png)
