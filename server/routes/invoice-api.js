/*
=====================================================
; File Name: invoice-api.js
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
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
const Ajv = require("ajv");

// Configurations
const router = express.Router();
const ajv = new Ajv();
const myfile = "invoice-api.js";

const invoiceSchema = {
  type: "object",
  required: [
    "lineItems",
    "partsAmount",
    "laborAmount",
    "lineItemTotal",
    "total",
  ],
  additionalProperties: false,
  properties: {
    lineItems: {
      type: "array",
      additionalProperties: false,
      required: ["title", "subtitle", "price"],
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        price: { type: "number" },
      },
    },
    partsAmount: { type: "number" },
    laborAmount: { type: "number" },
    lineItemTotal: { type: "number" },
    total: { type: "number" },
  },
};

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
 *                     - subtitle
 *                     - price
 *                   properties:
 *                     title:
 *                       type: string
 *                     subtitle:
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
router.post("/:username", async (req, res) => {
  try {
    // Create a new invoice object
    const newInvoice = {
      username: req.params.username,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };

    // Validate the request body
    const incomingInvoice = req.body;
    const validator = ajv.compile(invoiceSchema);
    const valid = validator(incomingInvoice);

    // If the request body is valid proceed with creating the invoice
    if (valid) {
      // Creates a new invoice
      Invoice.create(newInvoice, (err, invoice) => {
        if (err) {
          console.log(err);
          const createInvoiceMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
          errorLogger({ filename: myfile, message: "Internal server error" });
        } else {
          // Invoice successfully created
          const createInvoiceResponse = new BaseResponse(
            "200",
            "Query successful",
            invoice
          );
          res.json(createInvoiceResponse.toObject());
          debugLogger({ filename: myfile, message: "Invoice created" });
        }
      });
    } else {
      // Body does not match schema
      console.log("Body does not match schema");
      const invoiceValidationError = new ErrorResponse(
        "400",
        "Bad request",
        `Invalid request, body does not match schema ${req.body}`
      );
      console.log(invoiceValidationError);
      errorLogger({
        filename: myfile,
        message: "Bad request, input does not match schema",
      });
      res.json(invoiceValidationError.toObject());
    }
  } catch (e) {
    // Server exception
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
    errorLogger({ filename: myfile, message: "Internal server error" });
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
              subtitle: "$lineItems.subtitle",
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
