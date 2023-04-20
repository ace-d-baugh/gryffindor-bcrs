/*
=====================================================
; File Name: session-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Professor Krasso
; Date: 04/19/2023
; File Description: API for user sessions
; Modifications: Chad ONeal, John Vanhessche, Ace Baugh
=====================================================
*/

// Require statements
const express = require("express");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const router = express.Router();
const Ajv = require('ajv')


const bcrypt = require("bcryptjs");
const ajv = new Ajv()
const logFile = 'session-api.js'


// Configurations


//schema
const sessionSigninSchema = {
  type: 'object',
  properties: {
    username: {type: 'string'},
    password: {type: 'string'}
  }, 
  required: ['username', 'password'],
    additionalProperties: false
}



/**
 * Signin
 */
// Chad Coded | Ace Tested | John Approved
/**
 * Signin
 * @openapi
 * /api/session/signin:
 *   post:
 *     tags:
 *       - Session
 *     description: API for signing in a user.
 *     summary: Signin
 *     requestBody:
 *         description: user information
 *         content:
 *             application/json:
 *                 schema:
 *                     required:
 *                         - username
 *                         - password
 *                     properties:
 *                         username:
 *                           type: string
 *                         password:
 *                           type: string
 *
 *     responses:
 *       '200':
 *         description: User signed in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post("/signin", (req, res) => {
  try {   

    const sessionSignin = req.body
    const validator = ajv.compile(sessionSigninSchema)
    const valid = validator(sessionSignin)

    if (valid) 
    
    {
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          console.log(err);
          const signinMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal Server Error",
            err
          );
          res.status(500).send(signinMongodbErrorResponse.toObject());
        } else {
          console.log(user);
          /**
           * Description: If the user is found, compare the password
           */
          if (user) {
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
            console.log(passwordIsValid);
            /**
             * if password is valid, return the user
             */
            if (passwordIsValid) {
              console.log("Login successful");
              const signinResponse = new BaseResponse(200, "Login successful", user);
              res.json(signinResponse.toObject());
            } else {
              /**
               * If password is invalid, return an error
               */
              console.log("Invalid password: Please try again");
              const invalidPasswordResponse = new BaseResponse(401, "Invalid password", "Please try again", user);
              res.status(401).send(invalidPasswordResponse.toObject());
            }
          } else {
            /**
             * if username is invalid, return an error
             */
            console.log(`Invalid username: ${req.body.userName}. Please try again`);
            const invalidUserNameResponse = new BaseResponse(401, "Invalid username", "Please try again", null);
            res.status(401).send(invalidUserNameResponse.toObject());
          }
        }
      });
    } else 
    {
      const signinValidationError = new ErrorResponse(
        400,
        "Bad Request", 
        `Input doesn't match expected Schema ${req.body}`
      );
      console.log(signinValidationError);
      res.json(signinValidationError.toObject());
    }    
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});



/**
 * User Sign-out
 */

module.exports = router;
