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
const saltRounds = 10;
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
            errorLogger({filename: myFile, message: "Invalid user id"})
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

// registerUserSchema
const registerUserSchema = {
  type: 'object',
  properties: {
    username: {type: 'string'},
    password: {type: 'string'},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    phoneNumber: {type: 'string'},
    address: {type: 'string'},
    email: {type: 'string'},
    selectedSecurityQuestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          questionText: {type: 'string'},
          answerText: {type: 'string'}
        },
        required: ['questionText', 'answerText'],
        additionalProperties: false
      }
    }
  },
  required: ['username', 'password', 'firstName', 'lastName', 'email'],
  additionalProperties: false
};

/** userRegister
 *  Chad coded | Ace Tested | John Approved
*/
/**
 * @openapi
 * /api/session/register:
 *   post:
 *     tags:
 *       - Session
 *     name: registerUser
 *     description: API to register a new user
 *     summary: registerUser
 *     requestBody:
 *        description: User information
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                phoneNumber:
 *                  type: string
 *                address:
 *                  type: string
 *                email:
 *                  type: string
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/register', async (req, res) => {
  try {
    const registerUser = req.body;
    const validator = ajv.compile(registerUserSchema);
    const valid = validator(registerUser);

    if (valid) {
      // Check if user already exists
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          console.log(err);
          const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(registerUserMongodbErrorResponse.toObject());
        } else {
          if (!user) {
            // Hash password
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

            // Create user object
            let registeredUser = {
              username: req.body.username,
              password: hashedPassword,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              email: req.body.email,
              role: { text: 'standard' },
              selectedSecurityQuestions: req.body.selectedSecurityQuestions
            };

            // Create new user
            User.create(registeredUser, function (err, newUser) {
              if (err) {
                console.log(err);
                const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(newUserMongodbErrorResponse.toObject());
              } else {
                const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
                res.json(registeredUserResponse.toObject());
              }
            })
          } else {
            console.log(`Username ${req.body.username} already exists`);
            const alreadyExistsUserResponse = new BaseResponse('400', `The username: ${req.body.username} is already in use.`, null);
            res.status(400).send(alreadyExistsUserResponse.toObject());
          }
        }
      });
    } else {
      const registerUserValidationError = new ErrorResponse(
        400,
        "Bad Request",
        `Input doesn't match expected Schema ${req.body}`
      );
      console.log(registerUserValidationError);
      res.json(registerUserValidationError.toObject());
      errorLogger({filename: myFile, message: "Bad request, input doesn't match schema"})
    }
  } catch (e) {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/** verifyUser
 *  @openapi
 * /api/verify/users/{username}:
 *   get:
 *     tags:
 *       - username
 *     description: API for verifying that a user exists by examining their user name
 *     summary: verifyUser
 *     parameters:
 *         - in: path
 *         name: username
 *         required: true
 *         description: The user name of the user to verify
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: A user name object
 *       500:
 *         description: Internal server error
 */
 /* John */
router.get('/verify/users/:username', async (req, res) => {
  try {
    User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
        console.log(err)
        const verifyMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(verifyMongodbErrorResponse.toObject());
        errorLogger({filename: myFile, message: `Error retrieving ${user} from database`});
      } else {
        if (user) {
          console.log(user);
          const verifyUserResponse = new BaseResponse('200', 'Query successful', user);
          res.json(verifyUserResponse.toObject());
          debugLogger({filename: myFile, message: `User ${user} successfully verified`})
        } else {
          const invalidUsernameResponse = new BaseResponse('400', 'Invalid username', req.params.username);
          res.status(400).send(invalidUsernameResponse.toObject());
          errorLogger({filename: myFile, message: `User ${user} doesn't exist`})
        }
      }
    })
  }
  catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: 'Internal Server Error'})
  }
})


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
/**
 * resetPassword
 * @openapi
 * /api/users/{username}/reset-password:
 *   post:
 *     tags:
 *       - username
 *     name: Reset Password
 *     description: API to reset the password for a user name
 *     summary: resetPassword
 *     parameters:
 *         - in: path
 *         name: username
 *         required: true
 *         description: The user name of the user to verify
 *         schema:
 *            type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '500':
 *         description: Internal server error
 *
 */
router.post('/users/:username/reset-password', async(req, res) => {

  try {

    const password = req.body.password;

    User.findOne({'username': req.params.username}, function(err, user) {
      if(err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
        errorLogger({filename: myFile, message: `Cannot find user ${username} on database`})
      } else {
        console.log(user);
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        //set the new password
        user.set({
          password: hashedPassword
        });

        //save the new password for the user
        user.save(function(err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
            errorLogger({filename: myFile, message: `Error attempting to save new password for ${updatedUser} user`});
          } else {
            console.log(updatedUser)
            const updatedUserPasswordResponse = new BaseResponse('200', 'Query successful', updatedUser);
            res.json(updatedUserPasswordResponse.toObject());
            debugLogger({filename: myFile, message: `Password for user ${updatedUser} reset successfully`});
          }
        })
      }
    })
  }
  catch (e) {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(resetPasswordCatchError.toObject());
    errorLogger({filename: myFile, message: 'Internal server error'});
  }
});











/**
 * User Sign-out
 */

module.exports = router;
