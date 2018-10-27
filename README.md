# JAMAZON # 
Julie Anne’s Zon, or Jamazon, is a command line application that functions a bit like Amazon. It uses Node.JS and MySQL to create and manipulate a product database. 

### TECHNOLOGY/ FRAMEWORKS USED ###
+ Javascript
+ [Node.js](https://nodejs.org/en/)
+ [MySQL](https://www.mysql.com/)
+ [Inquirer npm](https://www.npmjs.com/package/inquirer)
+ [console.table npm](https://www.npmjs.com/package/console.table)
+ [chalk npm](https://www.npmjs.com/package/chalk)

### DATABASE SET-UP ###
The Jamazon MySQL database is populated with two tables, products and departments. The departments table is initially seeded with 3 departments, “Toys,” “Kitchen,” and “Outdoors.” The products table is initially seeded with 12 items, each item falls in one of the initial three departments defined in the departments table. Both the schema to establish the database and tables and table seed files are included in this repository. 

### FUNCTIONALITY ###
Jamazon function on three levels.  
1. The **customer interface** displays all items in stock, takes customer orders, and depletes the database accordingly.  
1. The **manager interface** allows a “manager” to view products for sale, views items with an inventory count less than 100, add stock to any existing inventory, and add new products to the database. 
1. The **supervisor interface** allows  “supervisors” to view a summary of departments, including product sales and total profit (both calculated with JS code), as well as add new departments. 

### JAMAZON IN ACTION ###

__CUSTOMER INTERFACE__

Upon calling JamazonCustomer.js, the app immediately lists all items available for purchase numerically by item id.  The customer is prompted, through Inquirer NPM, to choose an item by inventory number, then an amount to purchase. The order, including total cost for the purchase, is summarized and the user is asked if she/he wishes to make another purchase. 
![Customer Command Line](/images/image15.png)

MySQL is updated to reflect the purchase. 
![Customer MySQL Update](/images/image8.png)

Multiple purchases can be made before exiting the application. 
![Customer Multiple Sales](/images/image4.png)
![Customer Multiple Sales SQL](/images/image4.png)

__Handeling Errors:__
In the case that there are not enough items to fill a customer’s request, the customer is allerted and asked to choose another quantity or product. No changes are made to the database. 
![Customer Insufficient Quantity](/images/image3.png)

The database is updated accordingly. 
![Customer Multiple Sales](/images/image11.png)

If the customer inputs something other than a number for either prompt, they will be alerted to enter a number and queried again. 
![Customer NaN](/images/image23.png)

Once correct sales have been made, the database is updated accordingly.
![Customer MySQL NaN](/images/image9.png)

___

__MANAGER INTERFACE__

Upon calling JamazonCustomer.js in Node, the app immediately lists available manager commands and prompts the manager to use arrow keys to select an action. 
![Manager menu](/images/image16.png)

__View Products for Sale:__ 
Selecting "View Products for Sale" requests data from the products table and uses [console.table npm](https://www.npmjs.com/package/console.table) to display available products numerically by item id. Product name, department name, price, quantity in stock, and product sales based on jamazonCustomer.js activity are also displayed.  The user is then asked how she/ he would like to further use their app. 
![Manager View Products](/images/image31.png)
![Manager View Products MySQL](/images/image.png)

__View Items with Low Inventory:__ 
Selecting "View Items with Low Inventory" queries the products table then returns and displays data for items with a stock quantity of less than 100. 
![Manager Low Inventory](/images/image1.png)
![Manager Low Inventory MySQL](/images/image.png)

In the event that all items are stocked at 100 of more items, the manager will be informed. 
![Manager No Low Inventory](/images/image18.png)

__Add to Inventory:__ 
Selecting "Add to Inventory" allows the manager to increase the stock count of any items already in inventory. The manager is prompted to scroll through a list of existing products and select that which she/ he would like to update. These changes are made in the database and reflected in a table displayed in the terminal.   
![Manager Add Inventory Menu](/images/image2.png)
![Manager Add Inventory](/images/image6.png)
![Manager Add Inventory MySQL](/images/image27.png)

__Handeling Errors:__ 
If the manager inputs something other than a number she/he is prompted to enter a number. The database is updated once a number is entered and the changes are reflected in a table displayed in the terminal. 
![Manager Add Inventory NaN](/images/image13.png)
![Manager Add Inventory NaN MySQL](/images/image.png)

__Add New Product:__ 
Selecting "Add to Inventory" allows the manager to add an entirely new product to the inventory. The manager is prompted to: 
* Enter a product name
* Enter a new or exisiting department name 
* Enter a unit price
* Determine how many of the new item will be entered into stock
The database is updated once a number is entered and the changes are reflected in a table displayed in the terminal. 
![Manager Add Product](/images/image24.png) 
![Manager Add Product MySQL](/images/image.png)

__Handeling Errors__
If the manager inputs something other than a number she/he is prompted to enter a number. The database is updated once a number is entered and the changes are reflected in a table displayed in the terminal. 
![Manager Add Product NaN](/images/image19.png)
![Manager Add Product NaN MySQL](/images/image17.png)

__SUPERVISOR INTERFACE__

Upon calling JamazonSupervisor.js in Node, the app immediately lists available supervisor commands and prompts the supervisor to use arrow keys to select an action.
![Supervisor menu](/images/image22.png)

__View Product Sales by Department:__ 
Selecting "View Product Sales by Department" makes a query to both products and departements tables.  The results returned are joined and manipulated in order to display department id, department name, overhead cost, product sales, and total price.  Product sales and total price are calculated dynamically based on data from both tables. 

![Supervisor View Product Sales](/images/image.png)
![Supervisor View Product Sales MySQL](/images/image.png)

__Create a New Department:__ 
Selecting "Create a New Department" allows the supervisor to add an entirely new department. The supervisor is prompted to: 
* Enter a department name
* Determine the overhead cost for this new department. 
The database is updated changes are reflected in a table displayed in the terminal. 
![Supervisor Create Department](/images/image14.png)
![Supervisor Create Department MySQL](/images/image20.png)

__Handeling Errors:__ 
If the supervisor inputs something other than a number she/he is prompted to enter a number. The database is updated once a number is entered and the changes are reflected in a table displayed in the terminal.  
![Supervisor Create Department NaN](/images/image.png)
![Supervisor Create Department NaN MySQL](/images/image.png)