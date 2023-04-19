/*
=====================================================
; File Name: security-question-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author:
; Date:
; File Description: API for security questions
; Modifications:
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
// Ace Code | John Test
router.get("/", async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(
            200,
            "Query successful",
            securityQuestions
          );
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * FindById
 */

/**
 * CreateSecurityQuestion
 */

/**
 * UpdateSecurityQuestion
 */
// Ace Code | John Test

/**
 * DeleteSecurityQuestion
 */

module.exports = router;
