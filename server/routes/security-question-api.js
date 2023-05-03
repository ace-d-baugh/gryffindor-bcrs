/*
=====================================================
; File Name: security-question-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: API for security questions
; Modifications: Ace Baugh, Chad ONeal, John Vanhessche
=====================================================
*/

// Require statements
const express = require("express");
const SecurityQuestion = require("../models/security-question");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const Ajv = require('ajv');
const { debugLogger, errorLogger } = require('../logs/logger');


// Configurations
const router = express.Router();
const ajv = new Ajv()
const myfile = 'security-question-api.js'

const securityQuestionsSchema = {
  type: 'object',
  properties: {
    text: {type: 'string'}
  },
  required: ['text'],
  additionalProperties: false
}

/**
 * FindAll
 * @openapi
 * /api/security-questions:
 *   get:
 *     tags:
 *       - Security Questions
 *     description: API for returning all security questions that are not disabled
 *     summary: findAll
 *     responses:
 *       200:
 *         description: A list of security questions that are not disabled
 *       500:
 *         description: Internal server error
 */
// Ace Coded | John Tested | Chad Approved
router.get("/", async (req, res) => {
  try {
    // Find all security questions that are not disabled
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          // Log the error
          console.log(err);
          // Create a new error response object
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          // Send the error response object
          res.status(500).send(findAllMongodbErrorResponse.toObject());
          errorLogger({filename: myfile, message: err})
        } else {
          // Log the security questions
          console.log(securityQuestions);
          // Create a new base response object
          const findAllResponse = new BaseResponse(
            200,
            "Query successful",
            securityQuestions
          );
          // Send the base response object
          res.json(findAllResponse.toObject());
          debugLogger({filename: myfile, message: "All security questions returned successfully"})
        }
      });
  } catch (e) {
    // Log the error
    console.log(e);
    // Create a new error response object
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    // Send the error response object
    res.status(500).send(findAllCatchErrorResponse.toObject());
    errorLogger({filename: myfile, message: e})
  }
});



/**
 * FindById
 * @openapi
 * /api/security-questions/{id}:
 *   get:
 *     tags:
 *       - Security Questions
 *     name: findSecurityQuestionById
 *     description: findById
 *     summary: findById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the securityQuestions collection by.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returned an security question with corresponding Id
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Chad Coded | John Tested | Ace Approved
router.get("/:id", async (req, res) => {
  try {
    // find a security question by _id, or return an error message
    SecurityQuestion.findOne({ _id: req.params.id },function (err, securityQuestion) {
        if (err) {
          console.log(err);
          //const findByIdMongoDBErrorResponse = new BaseResponse(501,`${config.mongoServerError}:${err.message}`, null);
          const findByIdMongoDBErrorResponse = new BaseResponse(501,"Invalid id and/or request", null);
          console.log(findByIdMongoDBErrorResponse.toObject());
          res.status(501).send(findByIdMongoDBErrorResponse.toObject());
          errorLogger({filename: myfile, message: `${req.params.id}: Invalid id and/or request`})
        } else {
          const findByIdResponse = new BaseResponse(
            200,
            `findSecurityQuestionById query was successful.`,
            securityQuestion
          );
          console.log(findByIdResponse.toObject());
          res.json(findByIdResponse.toObject());
          debugLogger({filename: myfile, message: "Query was successful"})
        }
      }
    );
  } catch (e) {
    // internal Server Error
    const findByIdErrorResponse = new ErrorResponse(
      500,
      `${config.serverError}:${err.message}`,
      null
    );
    console.log(findByIdErrorResponse.toObject());
    res.status(500).send(findByIdErrorResponse.toObject());
    errorLogger({filename: myfile, message: "Internal Server Error"})
  }
});



/**
 * createSecurityQuestion
 * @openapi
 * /api/security-questions:
 *   post:
 *     tags:
 *       - Security Questions
 *     description: API to create new security question
 *     summary: createSecurityQuestion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - security Question
 *             properties:
 *              text:
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
// John Coded | Chad Tested | Ace Approved
router.post("/", async (req, res) => {
  try
  {
    const newSecurityQuestion = req.body
    const validator = ajv.compile(securityQuestionsSchema)
    const valid = validator(newSecurityQuestion)

    if (valid)
    {
      SecurityQuestion.create(
        newSecurityQuestion,
        function (err, securityQuestion) {
          if (err) {
            console.log(err);
            const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res
              .status(500)
              .send(createSecurityQuestionMongodbErrorResponse.toObject());
              errorLogger({filename: myfile, message: "Message could not be created"})
          } else {
            console.log(securityQuestion);
            const createSecurityQuestionResponse = new BaseResponse(
              200,
              "Query successful",
              securityQuestion
            );
            res.json(createSecurityQuestionResponse.toObject());
            debugLogger({filename: myfile, message: `${securityQuestion} was added successfully`})
          }
        }
      );
    } else
    {
        const securityQuestionValidationError = new ErrorResponse(
          400,
          "Bad Request",
          `Input doesn't match expected Schema ${req.body}`
        );
        console.log(securityQuestionValidationError);
        errorLogger({ filename: myfile, message: "Bad request, input doesn't match schema"})
        res.json(securityQuestionValidationError.toObject());
    }
  }
  catch (e) {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
    errorLogger({filename: myfile, message: "Internal Server Error"})
  }
});


/**
 * updateSecurityQuestion
 * @openapi
 * /api/security-questions/{id}:
 *   put:
 *     tags:
 *       - Security Questions
 *     description: Update a security question by id
 *     summary: updateSecurityQuestions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     requestBody:
 *        description: Security Question field that needs to be updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                text:
 *                  type: string
 *     responses:
 *       '200':
 *         description: A security question gets updated
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Ace Coded | John Tested | Chad Approved
router.put("/:id", async (req, res) => {
  try {

    const updateSecurityQuestion = req.body
    const validator = ajv.compile(securityQuestionsSchema)
    const valid = validator(updateSecurityQuestion)

    if (valid)
    {
      SecurityQuestion.findOne(
        { _id: req.params.id },
        function (err, securityQuestion) {
          if (err) {
            console.log(err);
            const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res
              .status(500)
              .send(updateSecurityQuestionMongodbErrorResponse.toObject());
              errorLogger({filename: myfile, message: "Message could not be updated"})
          } else {
            console.log(securityQuestion);

            securityQuestion.set({
              text: req.body.text,
            });

            securityQuestion.save(function (err, savedSecurityQuestion) {
              if (err) {
                console.log(err);
                const savedSecurityQuestionMongodbErrorResponse =
                  new ErrorResponse(500, "Internal server error", err);
                res
                  .status(500)
                  .send(savedSecurityQuestionMongodbErrorResponse.toObject());
                  errorLogger({filename: myfile, message: "Internal server error"})
              } else {
                console.log(savedSecurityQuestion);
                const savedSecurityQuestionResponse = new BaseResponse(
                  200,
                  "Query successful",
                  savedSecurityQuestion
                );
                res.json(savedSecurityQuestionResponse.toObject());
                debugLogger({filename: myfile, message: `${securityQuestion} was updated successfully`})
              }
            });
          }
        }
      );
    } else {
      const securityQuestionValidationError = new ErrorResponse(
        400,
        "Bad Request",
        `Input doesn't match expected Schema ${req.body}`
      );
      console.log(securityQuestionValidationError);
      res.json(securityQuestionValidationError.toObject());
      errorLogger({filename: myfile, message: "Input doesn't match expected schema"})
    }
  } catch (e) {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
    errorLogger({filename: myfile, message: "Internal server error"})
  }
});

/**
 * DeleteSecurityQuestion
 * @openapi
 * /api/security-questions/{id}:
 *   delete:
 *     tags:
 *       - Security Questions
 *     description: Deletes security question by ID
 *     summary: deleteSecurityQuestions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: Security question gets deleted
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Chad Coded | Ace Tested | John Approved
router.delete("/:id", async (req, res) => {
  // find a security question by _id and delete it, or return an error message
  try {
    SecurityQuestion.findOne(
      { _id: req.params.id },
      function (err, securityQuestion) {
        if (err) {
          console.log(err);
          const deleteByIdMongoDBErrorResponse = new ErrorResponse(
            501,
            "Internal server error",
            null
          );

          console.log(deleteByIdMongoDBErrorResponse.toObject());
          res.status(501).send(deleteByIdMongoDBErrorResponse.toObject());
          errorLogger({filename: myfile, message: "Internal Server error"})

        } else {
          securityQuestion.set({
            isDisabled: true,
          });

          securityQuestion.save(function (err, savedSecurityQuestion) {
            if (err) {
              console.log(err);
              const savedSecurityQuestionMongoDBErrorResponse =
                new ErrorResponse(
                  501,
                  "Internal server error",
                  null
                );

              console.log(savedSecurityQuestionMongoDBErrorResponse.toObject());
              res
                .status(501)
                .send(savedSecurityQuestionMongoDBErrorResponse.toObject());
                errorLogger({filename: myfile, message: "Could not be deleted"})
            } else {
              // console.log(savedSecurityQuestion);

              const deleteByIdResponse = new BaseResponse(
                200,
                `Security Question deleted.`,
                savedSecurityQuestion
              );
              res.json(deleteByIdResponse.toObject());
              debugLogger({filename: myfile, message: "Security Question deleted successfully"})
            }
          });
        }
      }
    );
  } catch (e) {
    // internal Server Error
    const deleteByIdErrorResponse = new ErrorResponse(
      500,
      `${config.serverError}:${err.message}`,
      null
    );
    console.log(deleteByIdErrorResponse.toObject());
    res.status(500).send(deleteByIdErrorResponse.toObject());
    errorLogger({filename: myfile, message: "Internal server error"})
  }
});

// Export the router
module.exports = router;
