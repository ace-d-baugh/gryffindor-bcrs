/*
=====================================================
; File Name: base-response.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Ace Baugh
; Date: 18 April 2023
; File Description: Base response class
; Modifications:
=====================================================
*/

class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
    };
  }
}

module.exports = BaseResponse;
