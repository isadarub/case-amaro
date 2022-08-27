# Amaro project

Final backend project for certification as Web Full Stack Dev by Labenu Bootcamp.
- Based on a real selection case: [Case Amaro](https://github.com/amaroteam/back-end-challenge)

## API Documentation - Postman

- [Postman](https://documenter.getpostman.com/view/20789432/VUxKSUFJ)

## Deploy - Heroku

- [Heroku]()

## Dependencies

- npm install: Installs the dependencies used in project development.
- To check the dependencies, consult the 'package.json' file.

## Creating and filling file .env

- Create the .env file and configure it with your database information, as follows:

PORT: 3003
DB_HOST = "your-host"
DB_USER = "your-user"
DB_PASSWORD = "your-pass"
DB_NAME = "name-of-your-database"

JWT_KEY = "pass"
JWT_EXPIRES_IN = "token-expiration"

BCRYPT_SALT_ROUNDS = 12 (default is 10/12)

## Populate tabelas

- npm run migrations: Creates and populates the tables in the database based on the data.ts file.

## Executing the project

- npm run dev: Establishes the connection to the database and automatically restarts the localhost server every time the project is changed and saved.

## Executing tests

- npm run test : Runs all unit tests created to test the project's Business folder.

## Basic Features

### Endpoint 1) Signup

Signup endpoint to register new users. It should receive the new user's name, email and password. On success, it returns a message and also an access token that stores the person's id and role.

### Endpoint 2) Login

Endpoint to log in users already registered. It should receive the person's email and password, and in case of success, it returns the message and the access token.

### Endpoint 3) Get products

Public endpoint that returns all products from the database, it is also possible to search by product by id or name.

### Endpoint 4) Products by tag

Public endpoint that returns all products of a given tag.

### Endpoint 5) Create product

Private endpoint to register new product in the database.

### Endpoint 6) Add tag to product

Private endpoint that adds a tag to a specific product registered in the database.

## Author

- [GitHub](https://github.com/isadarub)
- [Linkedin](https://www.linkedin.com/in/isadarub)

## Stack - Backend

- Node.JS
- Express.JS
- API REST
- MySQL
