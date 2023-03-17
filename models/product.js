const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productLabel: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    productReference: {
      type: String,
      required: true,
      trim: true,
    },
    productSellingPrice: {
      type: Number, 
      required: true,
      trim: true,
    },
    productPurschasePrice: {
      type: Number,
      required: true,
      trim: true,
    },
    productQte: {
      type: Number,
      required: true,
      trim: true,
    },
    productImages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Image',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
