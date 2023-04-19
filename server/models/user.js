/*
=====================================================
; File Name: user.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: This file creates the user model
; Modifications: Ace Baugh
=====================================================
*/

//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserRoleSchema = require("../schemas/user-role");
const SelectedSecurityQuestionsSchema = require("../schemas/selected-security-questions");

//user schema
let UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionsSchema],
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date },
  },
  { collection: "users" }
);

//export the model
module.exports = mongoose.model("User", UserSchema);
