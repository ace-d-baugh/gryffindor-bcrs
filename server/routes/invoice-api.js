/*
=====================================================
; File Name: invoice-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: API for invoices
; Modifications: Ace Baugh, Chad ONeal, John Vanhessche
=====================================================
*/

// Require statements
const express = require("express");
const Invoice = require("../models/invoice");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const Ajv = require("ajv");
const { debugLogger, errorLogger } = require("../logs/logger");
const router = require("./role-api");


// Configurations
const router = express.Router();
const ajv = new Ajv()
const myfile = 'invoice-api.js'


/**
 * Create Invoice
 */
// Chad Coded | John Tested | Ace Approved



/**
 * FindPurchaseByService
 * @openapi
 * /api/invoices/purchases-graph:
 *   get:
 *     tags:
 *       - Invoices
 *     description: API for returning purchase graph data
 *     summary: Returns purchase graph data
 *     responses:
 *       '200':
 *         description: Purchase graph data successfully returned
 *       '500':
 *         description: Internal server error
 */
// Ace Coded | John Tested | Chad Approved
router.get('/purchase-graph', async(req, res) => {
  try {
    Invoice.aggregate([
      {
        $unwind: "$lineItems"
      },
      {
        $group:
        {
          _id: {
            'title': "$lineItems.title",
            'price': "$lineItems.price"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort:
        {
          "_id.title": 1
        }
      }
    ], function(err, purchaseGraph) {
      if (err) {
        console.log(err);
        errorLogger.error(err);
        const findPurchaseGraphMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(findPurchaseGraphMongodbErrorResponse.toObject());
        errorLogger({filename: myfile, message: "Internal server error"});
      } else {
        console.log(purchaseGraph);
        debugLogger.debug(purchaseGraph);
        const findPurchaseGraphResponse = new BaseResponse(
          "200",
          "Query successful",
          purchaseGraph
        );
        res.json(findPurchaseGraphResponse.toObject());
        debugLogger({filename: myfile, message: "Query successful"});
      }
    })
  } catch (e) {
    console.log(e);
    errorLogger.error(e);
    const findPurchaseGraphCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findPurchaseGraphCatchErrorResponse.toObject());
    errorLogger({filename: myfile, message: "Internal server error"});
  }
});


