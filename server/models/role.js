/*
=====================================================
; File Name: roles.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/02/2023
; File Description: Defines the schema for the role collection.
; Modifications: John Vanhessche
=====================================================
*/

//imports for Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//roleSchema model for adding roles to db.
const roleSchema = new Schema({
    text: {type: String, unique: true},
    isDisabled: {type: Boolean, default: false}
}, {collection: 'roles'} )

//exporting the module.
module.exports = mongoose.model('Role', roleSchema);