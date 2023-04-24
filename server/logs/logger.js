/*
=====================================================
; File Name: logger.js.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
: modified by: John Vanhessche
; Date: 04/23/2023
=====================================================
*/

// Require statements and variables.
const { appendFileSync } =require('fs');
const { join } = require('path');

const debugLog = join(__dirname, 'debug.log')
const errorLog = join(__dirname, 'error.log')

//generate the date and time to append to log messages.
const getDateTime = () => {
  const now = new Date()
  return now.toLocaleString('en-US')
}

//method for logging good messages
module.exports.debugLogger = (data) => {
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message}\n`
  appendFileSync(debugLog, logString)
}

// method for logging errors.
module.exports.errorLogger = (data) => {
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message}\n`
  appendFileSync(errorLog, logString)
}