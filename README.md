# JAMAZON # 
Jamazon, Julie Anne’s Zon, is a command line application that functions a bit like Amazon. It uses Node.JS and MySQL to create and manipulate a product database. 

### TECHNOLOGY/ FRAMEWORKS USED ###
+ Javascript
+ [Node.js](https://nodejs.org/en/)
+ [MySQL](https://www.mysql.com/)
+ [Inquirer npm](https://www.npmjs.com/package/inquirer)
+ [console.table npm](https://www.npmjs.com/package/console.table)
+ [chalk npm](https://www.npmjs.com/package/chalk)

### DATABASE SET-UP ###
The Jamazon MySQL database initially contains two tables: products and departments.  The departments table is initially seeded with 3 departments, “Toys,” “Kitchen,” and “Outdoors.” the products table is initially seeded with 12 items, each item falls in one of the initial three departments defined in the “departments” table. Both the schema to establish the database and tables and table seed files are included in this repository. 

### FUNCTIONALITY ###
Jamazon function on three levels.  
1. The **customer interface** displays all items in stock, takes customer orders, and depletes the database accordingly.  
1. The **manager interface** allows a “manager” to view products for sale, items with an inventory count less than 100, add stock to any existing inventory, and add a new product to the database. 
1. The **supervisor interface** allows  “supervisors” to view a summary of departments, including product sales and total profit (both calculated with an algorithm), as well as add new departments. 

### JAMAZON IN ACTION ###

__CUSTOMER INTERFACE__

Below Jamazon has been seeded with 12 items available for purchase.  
![Seeded Customer Database](/images/image.png)

__Basic Function__
Upon calling JamazonCustomer.js, the app immediately lists all items available for purchase numerically by item id.  The customer is prompted, through Inquirer NPM, to choose an item by inventory number, then an amount to purchase. The order, including total cost for the purchase is summarized and the user is asked if she/he wishes to make another purchase. 
![Customer Function Command Line](/images/image.png)

MySQL is updated to reflect purchase. 
![Customer Function MySQL Update](/images/image7.png)

Multiple purchases can be made before exiting the application. 
![Customer Function Multiple Sales](/images/image4.png)

__Handeling Errors__
In the case that there are not enough items to fill a customer’s request, the customer is allerted and asked to choose another quantity or product. No changes are made to the database. 
![Customer Function Insufficient Quantity](/images/image3.png)

The database is updated accordingly. 
![Customer Function Multiple Sales](/images/image.png)

If the customer inputs something other than a number they will be prompted to enter a number and queried again. 
![Customer Function NaN](/images/image.png)

The database is updated accordingly.
![Customer Function MySQL NaN](/images/image.png)
___

__MANAGER INTERFACE__
Upon calling JamazonCustomer.js, the app immediately lists the available manager commands. The "manager" uses arrow keys to select an action. 
![Manager Function menu](/images/image.png)

__View Products for Sale__
Selecting "View Products for Sale" requests data from the products table and uses [console.table npm](https://www.npmjs.com/package/console.table) to display products available numerically by item id. Product name, department name, price, quantity in stock and sales based on jamazonCustomer.js activity are also displayed.  The user is then asked how she/ he would like to further use their app. 
![Manager Function View Products](/images/image.png)
![Manager Function View Products MySQL](/images/image.png)

__View Items with Low Inventory__
Selecting "View Items with Low Inventory" queries the products database and returns and displays data for items with a stock quantity of less than 100. 
![Manager Function Low Inventory](/images/image1.png)
![Manager Function Low Inventory MySQL](/images/image.png)

In the event that all items are at 100 or great stock count the "manager" will be informed. 

__Add to Inventory__
Selecting "Add to Inventory" allows the "manager" to increase the stock count of any items already in inventory. The "manager" is prompted to scroll through a list of existing products and select that which she/ he would like to update.  
![Manager Function Add Inventory Menu](/images/image2.png)
![Manager Function Add Inventory](/images/image6.png)
![Manager Function Add Inventory MySQL](/images/image.png)

__Handeling Errors__
If the manager inputs something other than a number she/he is prompted to enter a number.  
![Manager Function Add Inventory NaN](/images/image10.png)
The database is updated once a number is entered. 
![Manager Function Add Inventory NaN MySQL](/images/image.png)

__Add New Product__
Selecting "Add to Inventory" allows the "manager" to add an entirely new product to the inventory. The "manager" is prompted to: 
* Enter a product name
* Enter a department name, this can be a new or existing department. 
* Enter a unit price. 
* Determine how many of the item will be entered into stock. 
![Manager Function Add Product](/images/image.png)
The database is updated accordingly. 
![Manager Function Add Product MySQL](/images/image.png)

__Handeling Errors__
If the manager inputs something other than a number she/he is prompted to enter a number.  
![Manager Function Add Product NaN](/images/image.png)
The database is updated once a number is entered. 
![Manager Function Add Product NaN MySQL](/images/image.png)

__MANAGER INTERFACE__
Upon calling JamazonSupervisor.js, the app immediately lists the available supervisor commands. The "supervisor" uses arrow keys to select an action. 
![Manager Function menu](/images/image.png)

__View Product Sales by Department__
Selecting "View Product Sales by Department" makes a query to both "products" and "departements" tables.  The results returned are joined and manipulated in order to display department id, department name, overhead cost, product sales, and total price.  Product sales and total price are both calculated dynamically based on data from both tables. 

![Supervisor Function View Product Sales](/images/image.png)
![Supervisor Function View Product Sales MySQL](/images/image.png)

__Create a New Department__
Selecting "Create a New Department" allows the "supervisor" to add an entirely new department. The "supervisor" is prompted to: 
* Enter a department name
* Determine the overhead cost for this new department. 
![Supervisor Function Create Department](/images/image.png)
The database is updated accordingly. 
![Supervisor Function Create Department MySQL](/images/image.png)

__Handeling Errors__
If the supervisor inputs something other than a number she/he is prompted to enter a number.  
![Supervisor Function Create Department NaN](/images/image.png)
The database is updated once a number is entered. 
![Supervisor Function Create Department NaN MySQL](/images/image.png)