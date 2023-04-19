/*
=====================================================
; File Name: user-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author:
; Date:
; File Description: User API
; Modifications:
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
// Ace Code | John Test
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

/*
Do I need this code?

dateModified:
  type: Date

*/

// Ace Code | John Test
router.put("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          dateModified: new Date(),
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(200, "Query successful", savedUser);
            res.json(saveUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});


/**
 * DeleteUser
 */

module.exports = router;
