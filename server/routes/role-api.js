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

const express = require('express');
const Role = require('../models/role')
const User = require('../models/user')
const ErrorResponse = require('../services/error-response')
const BaseResponse = require('../services/base-response')
const Ajv = require('ajv');
const { debugLogger, errorLogger } = require('../logs/logger');

//configurations
const router = express.Router();
const ajv = new Ajv();
const myfile = 'role-api.js'

/**
 * FindAll
 */






/**
 * FindById
 */







/**
 * CreateRole
 */
/**
 * createRole
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

const createRoleSchema = {
    type: 'object',
    properties: {
      text: {type: 'string'}
    },
    required: ['text'],
    additionalProperties: false
  }

router.post('/', async (req, res) => {

    try {
        //verifies the user entered something into the field.
        const enteredRole = req.body
        const validator = ajv.compile(createRoleSchema)
        const valid = validator(enteredRole)
        
        if(valid)
        {
            //checks to see if what the user entered is already on the database.
            Role.findOne({'text': req.body.text}, function(err, role)
            {
                if(err) 
                {   
                    //if an error is thrown while checking the database.
                    console.log(err)
                    const findMongodbError = new ErrorResponse(500, 'Internal Server Error', err);
                    res.status(500).send(findMongodbError.toObject());
                    errorLogger({filename: myfile, message: "Could not request role data from Mongo"})
                } 
                else 
                {
                    console.log(role)
                }

                //if entered role is unique
                if(!role) 
                {
                    //defines newRole to be added
                    const newRole = {text: req.body.text}

                    //creates the new role on the database
                    Role.create(newRole, function(err, role)
                    {
                        if(err)
                        {
                            //if there's an error with mongo during the create
                            console.log(err)
                            const createMongodbErrorResponse = new ErrorResponse(500, 'Internal Server Error', err);
                            res.status(500).send(createMongodbErrorResponse.toObject());
                            errorLogger({filename: myfile, message: "Error creating role on Mongo"})
                        } 
                        else                         
                        {
                            //return message that role was created successfully
                            console.log(role)
                            const createRoleResponse = new BaseResponse(200, 'Query Successful', role);
                            res.json(createRoleResponse.toObject());
                            debugLogger({filename: myfile, message: "The role was added successfully"})
                        }
                    })
                }                
                else
                {
                    //if the entered role already exists, return an error.
                    console.log(`Role ${req.body.text} already exists.`)
                    const roleAlreadyExists = new ErrorResponse(400, `Role ${req.body.text} already exists.  The role could be disabled.`, null);
                    res.status(400).send(roleAlreadyExists.toObject());
                    errorLogger({filename: myfile, message: "Entered role is not unique"})
                }
            })
        }        
        else 
        {
            //if the user didn't enter anything in the field
            const inputRoleError = new ErrorResponse(404, "Bad Request.  Input doesn't match Schema");
            console.log(inputRoleError);
            res.json(inputRoleError.toObject());
            errorLogger({filename: myfile, message: "The field was blank, or the data could not be read"})
        }
    }
    catch(e)
    {
        console.log(e)
        const createRoleCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
        res.status(500).send(createRoleCatchErrorResponse.toObject());
        errorLogger({filename: myfile, message: "Internal server error"})
    }
});



/**
 * UpdateRole
 */





/**
 * DeleteRole
 */


module.exports = router;