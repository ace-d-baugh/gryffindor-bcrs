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
const bcrypt = require('bcrypt.js');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

// Configurations
const router = express.Router();
const saltRounds = 10;   //default hash for algorithm


/**
 * FindAll
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
 */
// Ace Code | John Test


/**
 * CreateUser
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
            userName: req.body.userName,
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
 * UpdateUser
 */
// Ace Code | John Test


/**
 * DeleteUser
 */

