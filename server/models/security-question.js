/*
=====================================================
; File Name: security-question.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author:
; Date:
; File Description: Security question schema
; Modifications:
=====================================================
*/

// Require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Security question schema
let securityQuestionSchema = new Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' });

// Export the model
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
