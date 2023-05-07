/*
=====================================================
; File Name: role-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/1/2023
; File Description: User API
; Modifications: Ace Baugh, Chad ONeal, John Vanhessche
=====================================================
*/

const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const Ajv = require("ajv");
const { debugLogger, errorLogger } = require("../logs/logger");

//configurations
const router = express.Router();
const ajv = new Ajv();
const myfile = "role-api.js";

/**
 * FindAll
 * @openapi
 * /api/role:
 *   get:
 *     tags:
 *       - Roles
 *     description: API for returning all roles that are not disabled
 *     summary: findAll
 *     responses:
 *       200:
 *         description: A list of roles that are not disabled
 *       500:
 *         description: Internal server error
 */
// Ace Coded | John Tested | Chad Approved
router.get("/", async (req, res) => {
  try {
    // find all roles, or return an error message
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongoDBErrorResponse = new BaseResponse(
            "500",
            "Internal Server Error",
            err
          );
          res.status(500).send(findAllRolesMongoDBErrorResponse.toObject());
          errorLogger({ filename: myfile, message: "Internal Server Error" });
        } else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            "200",
            "Query Successful",
            roles
          );
          res.json(findAllRolesResponse.toObject());
          debugLogger({ filename: myfile, message: "Query was successful" });
        }
      });
  } catch (e) {
    // internal Server Error
    console.log(e);
    const findAllRolesCatchErrorResponse = new BaseResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal Server Error" });
  }
});

/**
 * FindById
 * @openapi
 * /api/role/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     description: Finds role by ID
 *     summary: findRoleById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the role to find.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Very nice, great success!
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Chad Coded | John Tested | Ace Approved
router.get("/:id", async (req, res) => {
  try {
    // find a role by _id, or return an error message
    Role.findOne({ _id: req.params.id }, function (err, role) {
      if (err) {
        console.log(err);
        //const findByIdMongoDBErrorResponse = new BaseResponse(501,`${config.mongoServerError}:${err.message}`, null);
        const findByIdMongoDBErrorResponse = new BaseResponse(
          501,
          "Invalid id and/or request",
          null
        );
        console.log(findByIdMongoDBErrorResponse.toObject());
        res.status(501).send(findByIdMongoDBErrorResponse.toObject());
        errorLogger({
          filename: myfile,
          message: `${req.params.id}: Invalid id and/or request`,
        });
      } else {
        const findByIdResponse = new BaseResponse(
          200,
          `Role ID was found.`,
          role
        );
        console.log(findByIdResponse.toObject());
        res.json(findByIdResponse.toObject());
        debugLogger({ filename: myfile, message: "Query was successful" });
      }
    });
  } catch (e) {
    // internal Server Error
    const findByIdErrorResponse = new ErrorResponse(
      500,
      `${config.serverError}:${err.message}`,
      null
    );
    console.log(findByIdErrorResponse.toObject());
    res.status(500).send(findByIdErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal Server Error" });
  }
});

/**
 * CreateRole
 * @openapi
 * /api/role:
 *   post:
 *     tags:
 *       - Roles
 *     description: API to create a new Role
 *     summary: createRole
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - new role text
 *             properties:
 *              text:
 *                type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '400':
 *         description: Role already exists
 *       '404':
 *         description: Bad request
 *       '500':
 *         description: Internal server error/MongoDB Exception
 */
//john Coded |   Tested|     Approved

//create role schema
const createRoleSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
  },
  required: ["text"],
  additionalProperties: false,
};

router.post("/", async (req, res) => {
  try {
    //verifies the user entered something into the field.
    const enteredRole = req.body;
    const validator = ajv.compile(createRoleSchema);
    const valid = validator(enteredRole);

    if (valid) {
      //checks to see if what the user entered is already on the database.
      Role.findOne({ text: req.body.text }, function (err, role) {
        if (err) {
          //if an error is thrown while checking the database.
          console.log(err);
          const findMongodbError = new ErrorResponse(
            500,
            "Internal Server Error",
            err
          );
          res.status(500).send(findMongodbError.toObject());
          errorLogger({
            filename: myfile,
            message: "Could not request role data from Mongo",
          });
        } else {
          console.log(role);
        }

        //if entered role is unique
        if (!role) {
          //defines newRole to be added
          const newRole = { text: req.body.text };

          //creates the new role on the database
          Role.create(newRole, function (err, role) {
            if (err) {
              //if there's an error with mongo during the create
              console.log(err);
              const createMongodbErrorResponse = new ErrorResponse(
                500,
                "Internal Server Error",
                err
              );
              res.status(500).send(createMongodbErrorResponse.toObject());
              errorLogger({
                filename: myfile,
                message: "Error creating role on Mongo",
              });
            } else {
              //return message that role was created successfully
              console.log(role);
              const createRoleResponse = new BaseResponse(
                200,
                "Query Successful",
                role
              );
              res.json(createRoleResponse.toObject());
              debugLogger({
                filename: myfile,
                message: "The role was added successfully",
              });
            }
          });
        } else {
          //if the entered role already exists, return an error.
          console.log(`Role ${req.body.text} already exists.`);
          const roleAlreadyExists = new ErrorResponse(
            400,
            `Role ${req.body.text} already exists.  The role could be disabled.`,
            null
          );
          res.status(400).send(roleAlreadyExists.toObject());
          errorLogger({
            filename: myfile,
            message: "Entered role is not unique",
          });
        }
      });
    } else {
      //if the user didn't enter anything in the field
      const inputRoleError = new ErrorResponse(
        404,
        "Bad Request.  Input doesn't match Schema"
      );
      console.log(inputRoleError);
      res.json(inputRoleError.toObject());
      errorLogger({
        filename: myfile,
        message: "The field was blank, or the data could not be read",
      });
    }
  } catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse(
      500,
      "Internal Server Error",
      e.message
    );
    res.status(500).send(createRoleCatchErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal server error" });
  }
});

/**
 * UpdateRole
 * @openapi
 * /api/role/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     description: Update a role by id
 *     summary: updateRole
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     requestBody:
 *        description: role field that needs to be updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                text:
 *                  type: string
 *     responses:
 *       '200':
 *         description: A role gets updated
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Ace Coded | John Tested | Chad Approved

const roleSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
  },
  required: ["text"],
  additionalProperties: false,
};

router.put("/:roleId", async (req, res) => {
  try {
    const updateRole = req.body;
    const validator = ajv.compile(roleSchema);
    const valid = validator(updateRole);

    if (valid) {
      //finds the role by id
      Role.findOne({ _id: req.params.roleId }, function (err, role) {
        if (err) {
          console.log(err);
          const updateRoleMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal Server Error",
            err
          );
          res.status(500).send(updateRoleMongodbErrorResponse.toObject());
          errorLogger({
            filename: myfile,
            message: "Error updating role on Mongo",
          });
        } else {
          console.log(role);

          role.set({
            text: req.body.text,
          });

          role.save(function (err, updatedRole) {
            if (err) {
              console.log(err);
              const updatedRoleMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal Server Error",
                err
              );
              res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
              errorLogger({
                filename: myfile,
                message: "Error updating role on Mongo",
              });
            } else {
              console.log(updatedRole);
              const updatedRoleResponse = new BaseResponse(
                "200",
                "Query Successful",
                updatedRole
              );
              res.json(updatedRoleResponse.toObject());
              debugLogger({
                filename: myfile,
                message: "The role was updated successfully",
              });
            }
          });
        }
      });
    } else {
      const updateRoleValidationError = new ErrorResponse(
        400,
        "BadRequest. Please check your input",
        `Input doesn't match the schema ${req.body}`
      );
      console.log(updateRoleValidationError);
      res.json(updateRoleValidationError.toObject());
      errorLogger({
        filename: myfile,
        message: "Input doesn't match expected schema",
      });
    }
  } catch (e) {
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal Server Error",
      e.message
    );
    res.status(500).send(updateRoleCatchErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal server error" });
  }
});

/**
 * deleteRole
 * @openapi
 * /api/role/{id}:
 *  delete:
 *      tags:
 *          - Roles
 *      description: Deletes a role by ID
 *      summary: deleteRole
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of role to delete
 *            required: yes
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Very nice, great success!
 *          '500':
 *              description: Server Exception
 *          '501':
 *              description: MongoDB Exception
 */
// Chad Coded | Ace Tested | John Approved
router.delete("/:id", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.id }, function (err, role) {
      if (err) {
        console.log(err);
        const deleteRoleMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal sever error",
          err
        );
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
        errorLogger({
          filename: myfile,
          message: `role ${req.params.id} not found`,
        });
      } else {
        console.log(Role);

        role.set({
          isDisabled: true,
          dateModified: new Date(),
        });

        role.save(function (err, savedRole) {
          if (err) {
            console.log(err);
            const savedRoleMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.json(savedRoleMongodbErrorResponse.toObject());
            errorLogger({ filename: myFile, message: "Unable to delete role" });
          } else {
            console.log(savedRole);
            const savedRoleResponse = new BaseResponse(
              200,
              "Query successful",
              savedRole
            );
            res.json(savedRoleResponse.toObject());
            debugLogger({
              filename: myfile,
              message: `user ${savedRole.username} deleted successfully`,
            });
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
    errorLogger({ filename: myFile, message: "Internal server error" });
  }
});

module.exports = router;
