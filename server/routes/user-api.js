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
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Configurations
const router = express.Router();


/**
 * FindAll
 */
// John Coded | Chad Tested | Ace Approved
router.get('/', async(req, res) => {
    try
    {
        User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
            if(err) {
                console.log(err);
                const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllMongodbErrorResponse.toObject());
            } else
            {
                console.log(users);
                const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
                res.json(findAllUsersResponse.toObject());
            }
        })
    } catch (e)
    {
        const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllCatchErrorResponse.toObject());
    }
});


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
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUser
 *     description: API to create new user
 *     summary: Creates a new user object
 *     operationId: createUser
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
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/', async (req, res) => {
    try
    {
        //hash password entered
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);  //salt/hash password
        standardRole = {
            text: 'standard'
        }

        //defining new user object from info entered on screen
        let newUser =
        {
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole
        };

        //create the user, create error and success message objects.
        User.create(newUser, function(err, user) {
            if(err) {
                console.log(err);
                const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(createUserMongodbErrorResponse.toObject());
            } else {
                console.log(user);
                const createUserResponse = new BaseResponse(200, 'Query successful', user);
                res.json(createUserResponse.toObject())
            }
        })
    } catch (e) {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});





/**
 * DeleteUser
 */
// Chad Coded | Ace Tested | John Approved


// Export the router
module.exports = router;
