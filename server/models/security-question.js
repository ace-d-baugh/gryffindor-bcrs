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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
    text: { type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);