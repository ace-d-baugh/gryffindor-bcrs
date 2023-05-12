/*
=====================================================
; File Name: session-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Professor Krasso
; Date: 05/08/2023
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
const Ajv = require("ajv");
const { debugLogger, errorLogger } = require("../logs/logger");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const ajv = new Ajv();
const myFile = "session-api.js";

// Configurations

//Datavalidation schemas
const sessionSigninSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

const verifySecurityQuestionsSchema = {
  type: "object",
  properties: {
    questionText1: { type: "string" },
    answerText1: { type: "string" },
    questionText2: { type: "string" },
    answerText2: { type: "string" },
    questionText3: { type: "string" },
    answerText3: { type: "string" },
  },
  required: [
    "questionText1",
    "answerText1",
    "questionText2",
    "answerText2",
    "questionText3",
    "answerText3",
  ],
  additionalProperties: false,
};

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
    const sessionSignin = req.body;
    const validator = ajv.compile(sessionSigninSchema);
    const valid = validator(sessionSignin);

    if (valid) {
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          console.log(err);
          const signinMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal Server Error",
            err
          );
          res.status(500).send(signinMongodbErrorResponse.toObject());
          errorLogger({ filename: myfile, message: "Internal server error" });
        } else {
          /**
           * Description: If the user is found, compare the password
           */
          if (user) {
            // If user is found and disabled, return an error
            if (!user.isDisabled) {
              let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );

              /**
               * if password is valid, return the user
               */
              if (passwordIsValid) {
                console.log("Login successful");
                const signinResponse = new BaseResponse(
                  200,
                  "Login successful",
                  user
                );
                res.json(signinResponse.toObject());
                debugLogger({
                  filename: myFile,
                  message: "User logged in successfully",
                });
              } else {
                /**
                 * If password is invalid, return an error
                 */
                const invalidPasswordResponse = new BaseResponse(
                  401,
                  "Invalid username or password. Please try again.",
                  user
                );
                res.status(401).send(invalidPasswordResponse.toObject());
                errorLogger({
                  filename: myFile,
                  message: "Invalid credentials entered",
                });
              }
            } else {
              const signinDisabledResponse = new BaseResponse(
                401,
                "User account has been disabled. Please contact the system administrator.",
                null
              );
              res.status(401).send(signinDisabledResponse.toObject());
              errorLogger({
                filename: myFile,
                message: "User account has been disabled",
              });
            }
          } else {
            /**
             * if username is invalid, return an error
             */
            const invalidUsernameResponse = new BaseResponse(
              401,
              "Invalid username or password. Please try again.",
              null
            );
            res.status(401).send(invalidUsernameResponse.toObject());
            errorLogger({ filename: myFile, message: "Invalid user id" });
          }
        }
      });
    } else {
      const signinValidationError = new ErrorResponse(
        400,
        "Bad Request",
        `Input doesn't match expected Schema ${req.body}`
      );
      console.log(signinValidationError);
      res.json(signinValidationError.toObject());
      errorLogger({
        filename: myFile,
        message: "Bad request, input doesn't match schema",
      });
    }
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(
      500,
      "Internal Server Error",
      e.message
    );
    res.status(500).send(signinCatchErrorResponse.toObject());
    errorLogger({ filename: myFile, message: "Internal Server error" });
  }
});

// registerUserSchema
const registerUserSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    address: { type: "string" },
    email: { type: "string" },
    selectedSecurityQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          questionText: { type: "string" },
          answerText: { type: "string" },
        },
        required: ["questionText", "answerText"],
        additionalProperties: false,
      },
    },
  },
  required: ["username", "password", "firstName", "lastName", "email"],
  additionalProperties: false,
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
 *                selectedSecurityQuestions:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      questionText:
 *                        type: string
 *                      answerText:
 *                        type: string
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/register", async (req, res) => {
  try {
    const registerUser = req.body;
    const validator = ajv.compile(registerUserSchema);
    const valid = validator(registerUser);

    if (valid) {
      // Check if user already exists
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          console.log(err);
          const registerUserMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(registerUserMongodbErrorResponse.toObject());
        } else {
          if (!user) {
            // Hash password
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            standardRole = { text: "standard" };

            // Create user object
            let registeredUser = {
              username: req.body.username,
              password: hashedPassword,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              email: req.body.email,
              role: standardRole,
              selectedSecurityQuestions: req.body.selectedSecurityQuestions,
            };

            // Create new user
            User.create(registeredUser, function (err, newUser) {
              if (err) {
                console.log(err);
                const newUserMongodbErrorResponse = new ErrorResponse(
                  "500",
                  "Internal server error",
                  err
                );
                res.status(500).send(newUserMongodbErrorResponse.toObject());
              } else {
                const registeredUserResponse = new BaseResponse(
                  "200",
                  "Query successful",
                  newUser
                );
                res.json(registeredUserResponse.toObject());
              }
            });
          } else {
            const alreadyExistsUserResponse = new BaseResponse(
              "400",
              `The username: ${req.body.username} is already in use.`,
              null
            );
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
      errorLogger({
        filename: myFile,
        message: "Bad request, input doesn't match schema",
      });
    }
  } catch (e) {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/** verifyUser
 *  @openapi
 * /api/session/verify/users/{username}:
 *   get:
 *     tags:
 *       - Session
 *     description: API for verifying that a user exists by examining their user name
 *     summary: verifyUser
 *     parameters:
 *       - in: path
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
router.get("/verify/users/:username", async (req, res) => {
  try {
    //Takes user name entered and finds on the database.
    User.findOne({ username: req.params.username }, function (err, user) {
      if (err) {
        //return error if the user doesn't exist on the database
        console.log(err);
        const verifyMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal Server Error",
          err
        );
        res.status(500).send(verifyMongodbErrorResponse.toObject());
        //Log error
        errorLogger({
          filename: myFile,
          message: `Error retrieving ${user} from database`,
        });
      } else {
        //return success if user was successfully found on the database.
        if (user) {
          const verifyUserResponse = new BaseResponse(
            "200",
            "Query successful",
            user
          );
          res.json(verifyUserResponse.toObject());
          //Log success message.
          debugLogger({
            filename: myFile,
            message: `User ${user} successfully verified`,
          });
        } else {
          //if user cannot be found due to an invalid username.  Instead of a 404 we are
          //returning a 418 to return a "invalid username", rather than an interceptor message.
          const invalidUsernameResponse = new BaseResponse(
            "418",
            " Invalid username",
            req.params.username
          );
          res.status(418).send(invalidUsernameResponse.toObject());
          //Log error
          errorLogger({
            filename: myFile,
            message: `User ${user} doesn't exist`,
          });
        }
      }
    });
  } catch (e) {
    //catch try errors
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
    //Log error
    errorLogger({ filename: myFile, message: "Internal Server Error" });
  }
});

/**
 * Verify security question
 * @openapi
 * /api/session/verify/users/{username}/security-questions:
 *   post:
 *     tags:
 *       - Session
 *     name: verifySecurityQuestions
 *     description: Compares users security question answers with answers saved in MongoDB.
 *     summary: verifySecurityQuestions
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: find a username first.
 *         scheme:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: User's security questions & answers save in MongoDB
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionText1
 *               - questionText2
 *               - questionText3
 *               - answerText1
 *               - answerText2
 *               - answerText3
 *             properties:
 *               questionText1:
 *                 type: string
 *               questionText2:
 *                 type: string
 *               questionText3:
 *                 type: string
 *               answerText1:
 *                 type: string
 *               answerText2:
 *                 type: string
 *               answerText3:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Security Questions verified
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Security questions answered incorrectly
 *       '404':
 *         description: Bad request, invalid username
 *       '500':
 *         description: Server Exception
 */
// Ace Coded | John Tested | Chad Approved
router.post("/verify/users/:username/security-questions", async (req, res) => {
  try {
    let verifySecurityQuestions = req.body;

    const validator = ajv.compile(verifySecurityQuestionsSchema);
    const valid = validator(verifySecurityQuestions);

    if (!valid) {
      console.log("Invalid request", validator.errors);
      const verifySecurityQuestionsInvalidRequest = new ErrorResponse(
        400,
        "Invalid request",
        validator.errors
      );
      res.status(400).send(verifySecurityQuestionsInvalidRequest.toObject());
      errorLogger({
        filename: myFile,
        message: "Invalid request",
        data: verifySecurityQuestionsInvalidRequest.toObject(),
      });
    } else {
      User.findOne({ username: req.params.username }, function (err, user) {
        if (err) {
          console.log(err);
          const verifySecurityQuestionMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          res
            .status(500)
            .send(verifySecurityQuestionMongodbErrorResponse.toObject());
          errorLogger({ filename: myFile, message: "Internal server error" });
        } else {
          const selectedSecurityQuestionOne =
            user.selectedSecurityQuestions.find(
              (q1) => q1.questionText === req.body.questionText1
            );
          const selectedSecurityQuestionTwo =
            user.selectedSecurityQuestions.find(
              (q2) => q2.questionText === req.body.questionText2
            );
          const selectedSecurityQuestionThree =
            user.selectedSecurityQuestions.find(
              (q3) => q3.questionText === req.body.questionText3
            );

          const isValidAnswerOne =
            selectedSecurityQuestionOne.answerText === req.body.answerText1;
          const isValidAnswerTwo =
            selectedSecurityQuestionTwo.answerText === req.body.answerText2;
          const isValidAnswerThree =
            selectedSecurityQuestionThree.answerText === req.body.answerText3;

          if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
            console.log(
              `User ${user.username} answered all security questions correctly`
            );
            const validSecurityQuestionsResponse = new BaseResponse(
              200,
              "Success",
              user
            );
            res.json(validSecurityQuestionsResponse.toObject());
            debugLogger({
              filename: myFile,
              message: "User answered all security questions correctly",
            });
          } else {
            console.log(
              `User ${user.username} answered one or more security questions incorrectly`
            );
            const invalidSecurityQuestionsResponse = new BaseResponse(
              400,
              "Error: One or more security questions were answered incorrectly",
              user
            );
            res.json(invalidSecurityQuestionsResponse.toObject());
            errorLogger({
              filename: myFile,
              message:
                "User answered one or more security questions incorrectly",
            });
          }
        }
      });
    }
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionCatchErrorResponse.toObject());
    errorLogger({ filename: myFile, message: "Internal server error" });
  }
});

//Data verification schema for resetPassword.
const resetPasswordSchema = {
  type: "object",
  properties: {
    password: { type: "string" },
  },
  required: ["password"],
  additionalProperties: false,
};

/** Reset password
 * John
 */
/**
 * resetPassword
 * @openapi
 * /api/session/users/{username}/reset-password:
 *   post:
 *     tags:
 *       - Session
 *     name: Reset Password
 *     description: API to reset the password for a user name
 *     summary: resetPassword
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The user name of the user to verify
 *         schema:
 *            type: string
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  password:
 *                    type: string
 *     required: true
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '500':
 *         description: Internal server error
 *
 */
router.post("/users/:username/reset-password", async (req, res) => {
  try {
    //Data validation.  Verifies the user entered a valid password.
    const sessionResetPassword = req.body;
    const validator = ajv.compile(resetPasswordSchema);
    const valid = validator(sessionResetPassword);

    //if the password passes data validation, find the username on the database.
    if (valid) {
      User.findOne({ username: req.params.username }, function (err, user) {
        //if there's an error communicating with the database.
        if (err) {
          console.log(err);
          const resetPasswordMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
          //Log error
          errorLogger({
            filename: myFile,
            message: `Cannot find user ${username} on database`,
          });
        } else {
          //If the database lookup returns successful, encrypt entered password.
          if (user) {
            let hashedPassword = bcrypt.hashSync(
              sessionResetPassword.password,
              saltRounds
            );

            //set the new password
            user.set({
              password: hashedPassword,
            });

            //save the new password for the user
            user.save(function (err, updatedUser) {
              if (err) {
                //if error communicating with the database during save.
                console.log(err);
                const updatedUserMongodbErrorResponse = new ErrorResponse(
                  "500",
                  "Internal server error",
                  err
                );
                res
                  .status(500)
                  .send(updatedUserMongodbErrorResponse.toObject());
                //Log error
                errorLogger({
                  filename: myFile,
                  message: `Error attempting to save new password for ${updatedUser} user`,
                });
              } else {
                //if success saving user, return success message.
                console.log(updatedUser);
                const updatedUserPasswordResponse = new BaseResponse(
                  "200",
                  "Query successful",
                  updatedUser
                );
                res.json(updatedUserPasswordResponse.toObject());
                //Log success.
                debugLogger({
                  filename: myFile,
                  message: `Password for user ${updatedUser} reset successfully`,
                });
              }
            });
          } else {
            //If username cannot be found return error.
            const resetPasswordNotFoundResponse = new ErrorResponse(
              404,
              "User not found",
              null
            );
            res.status(404).send(resetPasswordNotFoundResponse.toObject());
            //Log error
            errorLogger({
              filename: myFile,
              message: `User ${req.params.username} not found`,
            });
          }
        }
      });
    }
  } catch (e) {
    //error for try statement.
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(resetPasswordCatchError.toObject());
    //Log error
    errorLogger({ filename: myFile, message: "Internal server error" });
  }
});

module.exports = router;
