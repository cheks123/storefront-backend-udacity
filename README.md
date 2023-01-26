# Storefront Backend Project
This is the backend application of an e-commerce store.

# Installation
After downloading or cloning the project, you can install the 
dependencies by running the command "yarn install"

# Database Installation
You are to create .env file containing the following:
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=store
    POSTGRES_USER=<Your password>
    POSTGRES_PASSWORD=<Your password>
    PEPPER=<your pepper>
    SALT=<your salt>
    TOKEN_SECRET=<Your token secret>
    ENV=dev

## Note:
When you want to run the test, you have to change the ENV from 'dev' to 'test'

## Database.json
Add database.json file at the root of the application before running the application.
The database.json should look like this:

{
    "dev": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "store",
        "user": "<your username>",
        "password": "<your username>"
    },
    
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "store_db_test",
        "user": "<your test user name>",
        "password": "<your username>"
    }
}

The 'dev' component is used when you are running the development version of the project,
while the 'test' commponent is used when you are running the unit and integrated test.

# Running the application
Run application with the command: npm run watch


# End Points

## All Users
To get all the users use: localhost:3000/users

## Create User
To create make a post request to: localhost:3000/users

## Specific User
To get specific user use: localhost:3000/user_id

## All Products
To get all products use: localhost:3000/products

## Specific Product
To get specific product use: localhost:3000/products/product_id


## All Orders
To get all the orders use: localhost:3000/orders

## Current orders
To get all current order by a particular user: localhost:3000/current-orders/user_id


# Testing
To test the application, run the command: npm run test
## Note:
Before you run the test make sure the environment variable ENV is set to 'test'

