const { Schema, model } = require("mongoose");

const logProductSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ten_nhacungcap: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

logProductSchema.index(
  {
    fullname: "text",
    note: "text",
  },
  {
    weights: {
      fullname: 2,
      note: 1,
    },
  }
);

module.exports = model("logproducts", logProductSchema);
