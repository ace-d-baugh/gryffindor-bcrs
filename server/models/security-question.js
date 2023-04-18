/*
=====================================================
; File Name:
; Project: Gryffindor - Bob's Computer Repair Shop
; Author:
; Date:
; File Description:
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
}, { collection: 'security-questions' });
