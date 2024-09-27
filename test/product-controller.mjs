import { describe } from "mocha";
import { expect } from "chai";

import {
  dbBeforeTests,
  dbAfterTests,
  initialProduct1ID,
  initialProduct2ID,
} from "./db-init.mjs";
import ProductController from "../controllers/product.js";

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

describe("Product controller Tests:", () => {
  before(dbBeforeTests);

  it("Should get all products.", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    ProductController.getProducts(req, res, (e) => {
      done(e);
    })
      .then((data) => {
        expect(res.statusCode).to.be.equal(200);
        expect(data.products.productList).to.be.an("array");
        expect(data.products.productList).to.have.lengthOf(2);
        done();
      })
      .catch((e) => {
        console.log(e);
        done(e);
      });
  });

  it(`Should get product with id ${initialProduct1ID}.`, (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.params.productId = initialProduct1ID;
    ProductController.getProduct(req, res, (e) => {
      done(e);
    })
      .then((data) => {
        expect(res.statusCode).to.be.equal(200);
        expect(data.product._id.toString()).to.be.equal(initialProduct1ID);
        expect(data.product.name).to.be.equal("Product1");
        done();
      })
      .catch((e) => {
        console.log(e);
        done(e);
      });
  });

  it("Should create new product with name 'Product5'.", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      name: "Product5",
      description: "ProductDescription",
      price: 5.99,
      stock: 5,
    };
    ProductController.postProducts(req, res, (e) => {
      done(e);
    })
      .then((data) => {
        expect(res.statusCode, "Should have status code of 200").to.be.equal(
          200
        );
        expect(
          data.product._id.toString(),
          "Should have _id and could be converted to string"
        ).to.be.a("string");
        expect(data.product.name, "Should have name as Product5").to.be.equal(
          "Product5"
        );
        expect(data.product.description).to.be.equal("ProductDescription");
        expect(data.product.price).to.be.equal(5.99);
        expect(data.product.stock).to.be.equal(5);
        done();
      })
      .catch((e) => {
        console.log(e);
        done(e);
      });
  });

  it("Should fail create a new product to database because negative price price.", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      name: "ProductF",
      description: "ProductDescription",
      price: -5.99,
      stock: 5,
    };
    ProductController.postProducts(req, res, (e) => {
      throw e;
    })
      .then(() => {
        done(new Error("Created product successfully with wrong data!!!"));
      })
      .catch((e) => {
        expect(
          e.message,
          "Should fail in DB validation as price is negative"
        ).to.be.equal(
          "Product validation failed: price: Path `price` (-5.99) is less than minimum allowed value (0.01)."
        );
        done();
      });
  });

  it("Should add more product to stock", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      quantity: 99,
    };
    req.params = {
      productId: initialProduct1ID,
    };
    ProductController.postProductsRestock(req, res, (e) => {
      throw e;
    })
      .then((data) => {
        expect(data.product.stock).to.be.equal(109);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("Should fail on adding more product to stock because of limit", (done) => {
    const req = { ...defaultReq };
    const res = { ...defaultRes };
    req.body = {
      quantity: 999999999999,
    };
    req.params = {
      productId: initialProduct1ID,
    };
    ProductController.postProductsRestock(req, res, (e) => {
      throw e;
    })
      .then((data) => {
        console.log("THEN DATA", data);
        done(new Error("Restock product successfully with to big quantity!!!"));
      })
      .catch((e) => {
        expect(e.statusCode).to.be.equal(400);
        expect(e.message).to.be.equal(
          "Product will pass a stock limit at 999999!"
        );
        done();
      });
  });

  after(dbAfterTests);
});
