const mongoose = require("mongoose");

const app = require("./app");
const ProductDB = require("./models/product");

const MONGODB_URI = process.env.MONGODB_URI;

const serverPort = process.env.PORT || 3000;
const initialProductID = "66f29c73da7e74570619b2be";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    //Creating initial product for dev testing purposes
    if (process.env.ENV === "DEV") {
      console.log("ENV is set to DEV");
      console.log("Checking initial product...");
      return ProductDB.findById(initialProductID).then((product) => {
        if (!product) {
          console.log(`Creating initial product with id ${initialProductID}`);
          const product = new ProductDB({
            _id: initialProductID,
            name: "Product1",
            description: "DescriptionProduct1",
            price: 1.99,
            stock: 10,
          });
          return product.save();
        }
        console.log("Initial product exist in DB.");
      });
    }
  })
  .then(() => {
    app.listen(serverPort, () => {
      console.log(`Server is running on port: ${serverPort}`);
    });
  })
  .catch((err) => {
    console.log("Error when connecting to database!", err);
  });
