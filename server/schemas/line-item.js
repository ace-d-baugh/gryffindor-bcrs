/*
=====================================================
; File Name: line-item.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/02/2023
; File Description: This file defines the line item schema
; Modifications: Ace Baugh
=====================================================
*/

//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//line item schema
let LineItemSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  price: { type: Number },
});

//export the model
module.exports = LineItemSchema;
