<h3 align="center">Simple Inventory Managment</h3>

## About

RESTful API for managing an inventory of products. The API support
basic CRUD operations and some basic logic for managing stock levels
and creating orders.

## 🏁 Getting Started

To run this app you need to have installed <a href="https://nodejs.org/en">node.js</a> and have access to <a href="https://www.mongodb.com/">mongodb</a> either remotely via mongodb atlas or installed localy.

### Installing

First create `.env` file with required data. Use `.env` for prod, `.env.dev` for development purpose and `.env.test` for testing.
In every of this file should be at least 3 required data.

```
PORT="Port number that should run application"
ENV="env of end file, PROD = prod, DEV = dev etc."
MONGODB_URI="either link to your remotely mongodb atlas DB or localy adress mongodb://127.0.0.1... etc."
```

Next run this to install all required dependency

```
npm install
```

and next to run development server

```
npm start
```

Application should be accessable from "localhost:PORT" (Port that was used in .env files)

## 🔧 Running the tests <a name = "tests"></a>

To run test make sure you setup `.env.test` correctly and have mongodb server running.

#### To run test simply run command

```
npm test
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework

## ✍️ Authors <a name = "authors"></a>

Jakub Chmielewski
