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
const { debugLogger, errorLogger } = require('../logs/logger');


const bcrypt = require("bcryptjs");
const ajv = new Ajv()
const myFile = 'session-api.js'

// Configurations


//Datavalidation schema
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
// Chad Coded | Ace Tested | John Approved
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
          errorLogger({filename: myfile, message: "Internal server error"})

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
              debugLogger({filename: myFile, message: "User logged in successfully"})
            } else {
              /**
               * If password is invalid, return an error
               */
              console.log("Invalid password: Please try again");
              const invalidPasswordResponse = new BaseResponse(401, "Invalid password", "Please try again", user);
              res.status(401).send(invalidPasswordResponse.toObject());
              errorLogger({filename: myFile, message: "Invalid credentials entered"})
            }
          } else {
            /**
             * if username is invalid, return an error
             */
            console.log(`Invalid username: ${req.body.userName}. Please try again`);
            const invalidUserNameResponse = new BaseResponse(401, "Invalid username", "Please try again", null);
            res.status(401).send(invalidUserNameResponse.toObject());
            errorLogger({filename: myFile, message: "Inavlid user id"})
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
      errorLogger({filename: myFile, message: "Bad request, input doesn't match schema"})
    }
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(500, "Internal Server Error", e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: "Internal Server error"})
  }
});



/** Register user
 *  Chad
*/






/** Verify user
 * John
 * */







/**
 * Verify security question
 * @openapi
 * /api/session/verify/users/{username}/security-questions:
 *   post:
*/
// Ace Coded | John Tested | Chad Approved
router.post('/verify/users/:username/security-questions', async(req, res) => {
  try {
    User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(verifySecurityQuestionMongodbErrorResponse.toObject());
        errorLogger({filename: myFile, message: "Internal server error"})
      } else {
        console.log(user);
        const selectedSecurityQuestionOne = user.securityQuestions.find(q => q.questionText === req.body.questionText1);
        const selectedSecurityQuestionTwo = user.securityQuestions.find(q2 => q.questionText === req.body.questionText2);
        const selectedSecurityQuestionThree = user.securityQuestions.find(q3 => q.questionText === req.body.questionText3);

        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(`User ${user.username} answered all security questions correctly`);
          const validSecurityQuestionsResponse = new BaseResponse(200, 'Success', user);
          res.json(validSecurityQuestionsResponse.toObject());
          debugLogger({filename: myFile, message: "User answered all security questions correctly"})
        } else {
          console.log(`User ${user.username} answered one or more security questions incorrectly`);
          const invalidSecurityQuestionsResponse = new BaseResponse(400, 'Error: One or more security questions were answered incorrectly', user);
          res.json(invalidSecurityQuestionsResponse.toObject());
          errorLogger({filename: myFile, message: "User answered one or more security questions incorrectly"})
        }
      }
    })
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(verifySecurityQuestionCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: "Internal server error"})
  }
})




/** Reset password
 * John
*/



module.exports = router;
