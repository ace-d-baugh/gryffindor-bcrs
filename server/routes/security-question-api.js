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
router.post('/', async(req, res) => {
  try 
  {
    let newSecurityQuestion = {
      text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
      if(err)
      {
        console.log(err);
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject()); 
      }
      else
      {
        console.log(securityQuestion);
        const createSecurityQuestionResponse = new BaseResponse(200, 'Query successful', securityQuestion);
        res.json(createSecurityQuestionResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * UpdateSecurityQuestion
 * @openapi
 * /api/security-questions/{id}:
 *   put:
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
// Ace Code | John Test
router.put("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const updateMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          text: req.body.text
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const updateSecurityQuestionResponse = new BaseResponse(200, "Query successful", savedSecurityQuestion);
            res.json(updateSecurityQuestionResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(updateCatchErrorResponse.toObject());
  }
});


/**
 * DeleteSecurityQuestion
 */

module.exports = router;
