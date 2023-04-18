/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN =
  "mongodb+srv://gryffindor_bcrs_user:s3cret@buwebdev-cluster-1.9wmv0d7.mongodb.net/gryffindor-bcrs?retryWrites=true&w=majority";

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

// Swagger API documentation options.
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeBucket API's",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/*.js"],
};

// Swagger specific options
const openapiSpecification = swaggerJsDoc(options);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
