/*
=====================================================
; File Name: base-response.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Base response class
; Modifications: Ace Baugh
=====================================================
*/

// This class is used to create a base response object
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // This method converts the base response object to a JSON object
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
    };
  }
}

// Export the class
module.exports = BaseResponse;
