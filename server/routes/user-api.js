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
const { debugLogger, errorLogger } = require('../logs/logger');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Configurations
const router = express.Router();
const myFile = 'user-api.js'


/**
 * FindAll
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     name: findAllUsers
 *     description: Reads,retrieves all users.
 *     summary: findAll
 *     operationId: findAllUsers
 *     responses:
 *       '200':
 *         description: Returned all users
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
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
                errorLogger({filename: myFile, message: "Internal server error"})
            } else
            {
                console.log(users);
                const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
                res.json(findAllUsersResponse.toObject());
                debugLogger({filename: myFile, message: "Query on all users was successful"})
            }
        })
    } catch (e)
    {
        const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllCatchErrorResponse.toObject());
        errorLogger({filename: myFile, message: "Internal server error"})
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
 *     summary: findById
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
        errorLogger({filename: myFile, message: `user ${req.params.id} is not found`})
      } else {
        console.log(user);
        const findByIdResponse = new BaseResponse(200, "Query successful", user);
        res.json(findByIdResponse.toObject());
        debugLogger({filename: myFile, message: `user ${user.username} found successfully`})
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: "Internal server error"})
  }
});



//TODO: validate
/**
 * CreateUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUser
 *     description: API to create new user
 *     summary: createUser
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
// John Coded | Chad Tested | Ace Approved
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
                errorLogger({filename: myFile, message: "Validation on creating user failed"})
            } else {
                console.log(user);
                const createUserResponse = new BaseResponse(200, 'Query successful', user);
                res.json(createUserResponse.toObject())
                debugLogger({filename: myFile, message: `user ${user.username} created successfully`})
            }
        })
    } catch (e) {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
        errorLogger({filename: myFile, message: "Internal server error"})
    }
});

//TODO: validate
/**
 * updateUser
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags:
 *          - Users
 *      description: updates a user by Id
 *      summary: updateUser
 *      parameters:
 *          - name: id
 *            in: path
 *            description: the id of the user to update
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          description: Updates the user information
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  phoneNumber:
 *                    type: string
 *                  email:
 *                   type: string
 *                  role:
 *                   type: string
 *                  address:
 *                    type: string
 *      responses:
 *          '200':
 *              description: Document updated
 *          '500':
 *              description: Server Exception
 *          '501':
 *              description: MongoDB Exception
 */
// Chad Coded | John & Ace Tested & Approved
router.put('/:id', async (req, res) => {
  try {
    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const updateUserByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(updateUserByIdMongodbErrorResponse.toObject());
        errorLogger({filename: myFile, message: `User ${req.params.id} not found`})
      } else {
        console.log(user);


        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          'role.text': req.body.role,
          dateModified: new Date(),
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
            errorLogger({filename: myFile, message: "Validation of updates failed"})
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(200, "Query successful", savedUser);
            res.json(saveUserResponse.toObject());
            debugLogger({filename: myFile, message: `user ${savedUser.username} updated successfully`})
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateUserByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(updateUserByIdCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: "Internal server error"})
  }
});


/**
 * DeleteUser
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags:
 *          - Users
 *      description: Deletes a user
 *      summary: deleteUser
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the employee to delete
 *            required: yes
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Document updated
 *          '500':
 *              description: Server Exception
 *          '501':
 *              description: MongoDB Exception
 */
// Chad Coded | Ace Tested | John Approved
router.delete('/:id', async (req, res) => {
  try {
    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal sever error",
          err
        );
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
        errorLogger({filename: myFile, message: `user ${req.params.id} not found`})
      } else {
        console.log(user);

        user.set({
          isDisabled: true,
          dateModified: new Date(),
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.json(savedUserMongodbErrorResponse.toObject());
            errorLogger({filename: myFile, message: "Unable to delete user"})
          } else {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(
              200,
              "Query successful",
              savedUser
            );
            res.json(savedUserResponse.toObject());
            debugLogger({filename: myFile, message: `user ${savedUser.username} deleted successfully`})
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
    errorLogger({filename: myFile, message: "Internal server error"})
  }
});

/**
 *
 * DO WE NEED THIS???
 *
 **/
router.delete("/deactivate/:username", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal sever error",
          err
        );
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          isDisabled: true,
          dateModified: new Date(),
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.json(savedUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(
              200,
              "Query successful",
              savedUser
            );
            res.json(savedUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
});


// Export the router
module.exports = router;
