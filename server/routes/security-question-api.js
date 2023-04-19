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

// Configurations
const router = express.Router();

/**
 * FindAll
 * @openapi
 * /api/security-questions:
 *   get:
 *     tags:
 *       - Security Questions
 *     description: API for returning all security questions that are not disabled
 *     summary: Retrieve all security questions that are not disabled
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
  }
});

/**
 * FindById
 * @openapi
 * /api/security-questions/{id}:
 *   get:
 *     tags:
 *       - Security Questions
 *     description: API for returning a security question by id
 *     summary: findById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the security question to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *       500:
 *         description: Internal server error
 */
// Chad Coded | John Tested | Ace Approved
router.get("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, SecurityQuestion) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(SecurityQuestion);
        const findByIdResponse = new BaseResponse(200, "Query successful", SecurityQuestion);
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});


/**
 * CreateSecurityQuestion
 */
// John Coded | Chad Tested | Ace Approved
router.post("/", async (req, res) => {
  try {
    let newSecurityQuestion = {
      text: req.body.text,
    };

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
        } else {
          console.log(securityQuestion);
          const createSecurityQuestionResponse = new BaseResponse(
            200,
            "Query successful",
            securityQuestion
          );
          res.json(createSecurityQuestionResponse.toObject());
        }
      }
    );
  } catch (e) {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * UpdateSecurityQuestion
 * @openapi
 * /api/security-questions/{id}:
 *   put:
 *     tags:
 *       - Security Questions
 *     summary: Update a security question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the security question to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Security question object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update successful
 *       500:
 *         description: Internal server error
 */
// Ace Coded | John Tested | Chad Approved
router.put("/:id", async (req, res) => {
  try {
    // Find the security question by ID
    SecurityQuestion.findOne(
      { _id: req.params.id },
      function (err, securityQuestion) {
        // If there is an error, return a 500 error
        if (err) {
          // Log the error
          console.log(err);
          // Create a new error response object
          const updateMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          // Send the error response object
          res.status(500).send(updateMongodbErrorResponse.toObject());
        } else {
          // Log the security question
          console.log(securityQuestion);

          // Update the security question
          securityQuestion.set({
            text: req.body.text,
          });

          // Save the security question
          securityQuestion.save(function (err, savedSecurityQuestion) {
            // If there is an error, return a 500 error
            if (err) {
              // Log the error
              console.log(err);
              // Create a new error response object
              const savedSecurityQuestionMongodbErrorResponse =
                new ErrorResponse(500, "Internal server error", err);
              // Send the error response object
              res
                .status(500)
                .send(savedSecurityQuestionMongodbErrorResponse.toObject());
            } else {
              // Log the security question
              console.log(savedSecurityQuestion);
              // Create a new base response object
              const updateSecurityQuestionResponse = new BaseResponse(
                200,
                "Query successful",
                savedSecurityQuestion
              );
              // Send the base response object
              res.json(updateSecurityQuestionResponse.toObject());
            }
          });
        }
      }
    );
  } catch (e) {
    // Log the error
    console.log(e);
    // Create a new error response object
    const updateCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    // Send the error response object
    res.status(500).send(updateCatchErrorResponse.toObject());
  }
});

/**
 * DeleteSecurityQuestion
 */
// Chad Coded | Ace Tested | John Approved

// Export the router
module.exports = router;
