/*
=====================================================
; File Name: selected-security-questions.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: This file defines the selected security questions schema
; Modifications: Ace Baugh
=====================================================
*/

//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//selected security questions schema
let SelectedSecurityQuestionsSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String },
});

//export the model
module.exports = SelectedSecurityQuestionsSchema;
