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
/**
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
 * updateUser
 */
// Chad Coded | John & Ace Tested & Approved
/**
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
    const updateUserByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(updateUserByIdCatchErrorResponse.toObject());
  }
});


/**
 * DeleteUser
 */
// Chad Coded | Ace Tested | John Approved
// Delete User
/**
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
