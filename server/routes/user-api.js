/*
=====================================================
; File Name: user-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: User API
; Modifications: Ace Baugh, Chad ONeal, John Vanhessche
=====================================================
*/

// Require needed modules
const express = require("express");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

// Configurations
const router = express.Router();


/**
 * FindAll
 */
// John Coded | Chad Tested | Ace Approved



/**
 * FindById
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: API for returning a user by id
 *     summary: Retrieve a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *       500:
 *         description: Internal server error
 */
// Ace Coded | John Tested | Chad Approved
router.get("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const findByIdResponse = new BaseResponse(200, "Query successful", user);
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
 * CreateUser
 */
// John Coded | Chad Tested | Ace Approved


/**
 * UpdateUser
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: API for updating a user
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - email
 *               - dateModified
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
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
    // Find the user document by id
    User.findOne({ _id: req.params.id }, function (err, user) {
      // Check if there is an error
      if (err) {
        // Log the error
        console.log(err);
        // Create a new error response object
        const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        // Send the error response object
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      } else {
        // Log the user document
        console.log(user);

        // Update the user document
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          dateModified: new Date(),
        });

        // Save the user document
        user.save(function (err, savedUser) {
          // Check if there is an error
          if (err) {
            // Log the error
            console.log(err);
            // Create a new error response object
            const saveUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            // Send the error response object
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            // Log the saved user document
            console.log(savedUser);
            // Create a new base response object
            const saveUserResponse = new BaseResponse(200, "Query successful", savedUser);
            // Send the base response object
            res.json(saveUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    // Log the error
    console.log(e);
    // Create a new error response object
    const updateUserCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    // Send the error response object
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});


/**
 * DeleteUser
 */
// Chad Coded | Ace Tested | John Approved


// Export the router
module.exports = router;