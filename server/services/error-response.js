/*
=====================================================
; File Name: error-response.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: This is the error response class
; Modifications: Ace Baugh
=====================================================
*/

// This class is used to create an error response object
class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // This method converts the error response object to a JSON object
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
    };
  }
}

// Export the class
module.exports = ErrorResponse;
