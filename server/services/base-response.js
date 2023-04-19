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
