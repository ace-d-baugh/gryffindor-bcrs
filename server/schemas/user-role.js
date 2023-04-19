/*
=====================================================
; File Name: user-role.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
: modified by: Chad ONeal
; Date: 04/18/2023
=====================================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
    text: {type: String, default: 'standard'}
});

module.exports = userRoleSchema;
