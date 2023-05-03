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
const { debugLogger, errorLogger } = require("../logs/logger");

// Configurations
const router = express.Router();
const myfile = "invoice-api.js";


/**
 * createInvoice
 * @openapi
 * /api/invoices/{username}:
 *   post:
 *     tags:
 *       - Invoices
 *     summary: createInvoice
 *     description:  Creates new invoice for a user.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username tied to an invoice
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lineItems
 *               - partsAmount
 *               - laborAmount
 *               - lineItemTotal
 *               - total
 *             properties:
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - price
 *                   properties:
 *                     title:
 *                       type: string
 *                     price:
 *                       type: number
 *               partsAmount:
 *                 type: number
 *               laborAmount:
 *                 type: number
 *               lineItemTotal:
 *                 type: number
 *               total:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Very nice, great success!
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
// Chad Coded | John Tested | Ace Approved
router.post('/:username', async (req, res) => {
  try {
    const newInvoice = {
      username: req.params.username,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };
    // Creates a new invoice
    Invoice.create(newInvoice, (err, invoice) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Invoice successfully created
        const response = logResponse(200, invoice);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});



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
router.get("/purchases-graph", async (req, res) => {
  try {
    Invoice.aggregate(
      [
        {
          $unwind: "$lineItems",
        },
        {
          $group: {
            _id: {
              title: "$lineItems.title",
              price: "$lineItems.price",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.title": 1,
          },
        },
      ],
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchaseGraphMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res
            .status(500)
            .send(findPurchaseGraphMongodbErrorResponse.toObject());
          errorLogger({ filename: myfile, message: "Internal server error" });
        } else {
          console.log(purchaseGraph);
          const findPurchaseGraphResponse = new BaseResponse(
            "200",
            "Query successful",
            purchaseGraph
          );
          res.json(findPurchaseGraphResponse.toObject());
          debugLogger({ filename: myfile, message: "Query successful" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    const findPurchaseGraphCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findPurchaseGraphCatchErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal server error" });
  }
});

// Export the router
module.exports = router;
