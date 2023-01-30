# Storefront Backend Project
This is the backend application of an e-commerce store.

# Libraries and Dependences

1. Runtime: Nodejs
2. Framework: Express
3. Language: TypeScript
4. Database: Postgres
5. Testing: Jasmine

## Other Dependencies

* bcryptjs
* body-parser
* cors
* db-migrate
* db-migrate-pg
* dotenv
* jsonwebtoken
* pg
* ts-node-dev



## Dev Dependencies
* @types/cors
* @types/express
* @types/jasmine
* @types/jsonwebtoken
* @types/pg
* jasmine
* jasmine-spec-reporter
* jasmine-ts
* ts-node
* tsc-watch

# Installation
1. Download or clone the application
2. Store dependencies with the command: yarn install

# Ports
Database port: 5432
Backend port: 3000

# Database Setup

# Create User
CREATE ROLE full_stack_user SUPERUSER LOGIN PASSWORD 'password123';

## Create Database
Use the following query commands to set up both the store and store_test database

CREATE DATABASE storefront_db;

CREATE DATABASE storefront_db_test;



# Environment Variables
Create a .env file at the root of the application with the following variables:

    POSTGRES_HOST=127.0.0.1

    POSTGRES_DB=storefront_db

    POSTGRES_DB_TEST=storefront_db_test

    POSTGRES_USER=full_stack_user

    POSTGRES_PASSWORD=password123

    PEPPER=udacity_project

    SALT=10

    TOKEN_SECRET=this_is_secret

    ENV=dev

## Note:
When you want to run the test, you have to change the ENV from 'dev' to 'test'

# Database Migration

## Create Tables
To create the tables, run the command at the root of the application: db-migrate up

## Drop Tables
To drop the tables, run the command at the root of the application: db-migrate down


# Running the application
Run application with the command: npm run watch


# End Points

## Create User
To create make a post request to: localhost:3000/users

The body of the request should contain the following information about the user:
    
    {
        "first_name": <first name of the user >,
        "last_name": <last name of the user>,
        "password": <password of the user>
    }
The application will automatically generate username for the user by 
concatenating the first_name and the lastname, both in lower case.

## Authenticate User
To authenticate a user, send a post request to: localhost:3000/users/authenticate
The body of the request should contain username (string) and password (string):
    
    {
        "username": "first name of the user",
        "password": "password of the user"
    }

The request will also return the username.

## All Users
To get all the users use: localhost:3000/users


## Specific User
To get specific user use: localhost:3000/user_id

## All Products
To get all products use: localhost:3000/products

## Specific Product
To get specific product use: localhost:3000/products/product_id

## Create Product
To create a product, make a post request to: localhost:3000/products
The body of the product should contain the product name (string) and price (number) the form:
{
    "name": "productname",
    "price": price
}

## All Orders
To get all the orders, send a get request to: localhost:3000/orders

## Current orders
To get all current order by a particular user,
send a get request to: localhost:3000/current-orders/user_id

## Add to order_products table
To combine order and products (one-many relationship),
make a post request to: localhost:3000/order-products

The body of the request should contain:
{
    "product_id": <integer>,
    "order_id": <integer>,
    "quantity": <integer>
}


# Testing
To test the application, run the command: npm run test

## Note:
Before running the test command, set the environment variable ENV to 'test'

