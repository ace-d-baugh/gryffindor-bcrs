/*
============================================
; Title: invoice.js
; Author: Professor Krasso
; Date: 05/02/2023
; Modified By: Chad ONeal
; Description: invoice model
;===========================================
*/

// import mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import line item schema
const lineItemDocument = require("../schemas/line-item");

// invoiceSchema model
const invoiceSchema = new Schema({
  username: { type: String },
  lineItems: [lineItemDocument],
  partsAmount: { type: Number },
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: { type: Date, default: new Date() },
});

// export invoiceSchema
module.exports = mongoose.model("Invoice", invoiceSchema);
