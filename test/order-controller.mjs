import { describe } from "mocha";
import { expect } from "chai";

import {
  dbBeforeTests,
  dbAfterTests,
  initialProduct1ID,
  initialProduct2ID,
} from "./db-init.mjs";
import OrderController from "../controllers/order.js";

const defaultReq = {
  query: {},
  body: {},
  params: {},
};

const defaultRes = {
  statusCode: 200,
  status: function (code) {
    this.statusCode = code;
    return this;
  },
  json: function (data) {
    return data;
  },
};

describe("Order controller Tests:", () => {
  before(dbBeforeTests);

  it("Should fail create order because of to many items in order than in stock", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      products: [
        {
          _id: initialProduct1ID,
          quantity: 5,
        },
        {
          _id: initialProduct2ID,
          quantity: 1000,
        },
      ],
    };
    OrderController.postOrders(req, res, (e) => {
      throw e;
    })
      .then(() => {
        done(new Error("Created order successfully with wrong data!!!"));
      })
      .catch((e) => {
        expect(e.statusCode, "Should fail with status code 400").to.be.equal(
          400
        );
        expect(
          e.message,
          "Should fail with correct error response about stock"
        ).to.be.equal("Not enought products on stock");
        done();
      });
  });

  it("Should create order with correct items and data", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      products: [
        {
          _id: initialProduct1ID,
          quantity: 2,
        },
        {
          _id: initialProduct2ID,
          quantity: 2,
        },
      ],
    };
    OrderController.postOrders(req, res, (e) => {
      throw e;
    })
      .then((data) => {
        expect(res.statusCode, "Should have status 200").to.be.equal(200);
        expect(data.order._id.toString(), "Should have ID").to.be.a("string");
        expect(data.order.products, "Should have array of products").to.be.an(
          "array"
        );
        expect(
          data.order.products,
          "Should have array of lenght 2"
        ).to.have.lengthOf(2);
        expect(
          data.order.products[0].product.toString(),
          "Should have equal ID as first item in order"
        ).to.be.equal(initialProduct1ID);
        expect(
          data.order.products[0].quantity,
          "Should have quantity of first item as 2"
        ).to.be.equal(2);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  after(dbAfterTests);
});
