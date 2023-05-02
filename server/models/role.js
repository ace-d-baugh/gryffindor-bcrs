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

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    text: {type: String, unique: true},
    isDisabled: {type: Boolean, default: false}
}, {collection: 'roles'} )

module.exports = mongoose.model('Role', roleSchema);