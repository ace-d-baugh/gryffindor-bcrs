/*
=====================================================
; File Name: index.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: This is the main server file
; Modifications: Ace Baugh
=====================================================
*/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const createError = require("http-errors");


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SecurityQuestionRoute = require("./routes/security-question-api");
const UserRoute = require("./routes/user-api");
const Session = require("./routes/session-api");

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));


// default server port value.
const PORT = process.env.PORT || 3000;

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
      title: "BCRS API's",
      version: "1.0.0",
    },
  },
  apis: ["./server/routes/*.js"],
};

// Swagger specific options
const openapiSpecification = swaggerJsDoc(options);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// API routes.
app.use("/api/security-questions", SecurityQuestionRoute);
app.use("/api/users", UserRoute);
app.use("/api/session", Session);

// Error handler for 404 errors
app.use(function (req, res, next) {
  // next(createError(404));
  // reroute to session/not-found
  res.redirect("/session/not-found");
});

// Error handler for other errors
app.use(function (err, req, res, next) {
  // res.status(err.status || 500);
  // res.send({
  //   type: "error",
  //   status: err.status,
  //   message: err.message,
  //   stack: req.app.get("env") === "development" ? err.stack : undefined,
  // });
  //reroute to session/server-error
  res.redirect("/session/server-error");
});

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});
