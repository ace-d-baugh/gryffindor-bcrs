/*
=====================================================
; File Name:  security-question.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: John Vanhessche
; Date: 18 April 2023
; File Description:  Model for security questions
; Modifications:
=====================================================
*/

//imports for Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for creating security questions on db.
let securityQuestionSchema = new Schema({
    text: { type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

//export module.
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);