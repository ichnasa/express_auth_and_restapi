// ? What i want to create?
// * A REST API and AUTHENTICATION USING JWT

// TODO [REST API]
// * ROUTE
// * [x] Set up a route for fetching a products data from database
// * [x] Set up a route for adding a product to a database
// * [X] Set up a route for updating a products
// * [x] Set up a route for deleting a product on databases
// * REFACTOR HTTP METHOD TO BE SAFETY PROVEN
// * [] Refactor getProducts so when it doesnt give any data, it says no data
// * [] Refactor getProductById so when it doesnt give any data, it says data not found
// * [] Refactor createProduct so when creating product with invalid data it wont allow to alter the db
// * [] Refactor deleteProduct so when deleting non existing product it says cant delete because product doesnt exist
// * [] Refactor updateProduct so when updating product with invalid data, it says cant update using invalid data
// * [] change product id from int to UUID

import express from 'express';
import colors from 'colors'
import products from './routes/products.js'

colors.enable();

const app = express();

// This will convert JSON to Javascript Object  
app.use(express.json())

// * BACK END LOGIC START HERE

// app.use('/products', getProducts)
app.use('/products', products)

app.listen(process.env.PORT, (req, res) => {
    console.log(`\nListening to ${process.env.PORT}`.bgGreen)
})

// this will be called when user access non existing route
app.use('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on the server!`)
    err.status = 'fail';
    err.statusCode = 404;

    // next(err) will call the global error handling middleware who has error as the first parameter and pass err object as argument
    // if there is an argument passed to next() fn, express will assume there is an error, AND IT WILL SKIP ALL MIDDLEWARE FUNCTION IN MIDDLEWARE STACK
    //  even next("random thing") express will assume there is an error
    next(err)
})

app.use((error, req, res, next) => {
    // when there is error caused outside of our program, it return status code 500
    //  else if the error caused by our program, our program will send status code based on the error happening in our program
    error.statusCode = error.statusCode || 500;
    // if error caused by error, it will return error.status given by our program logic else it will return error if caused by external error
    error.status = error.status || 'error'
    // this will send JSON message to the user who receive an error
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})