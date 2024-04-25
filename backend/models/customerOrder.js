const { Schema, model } = require("mongoose");

const customerOrder = new Schema(
  {
    customerId: {
      type: Schema.ObjectId,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    shippingInfo: {
      type: Object,
      required: true,
    },
    delivery_status: {
      type: String,
      required: true,
    },
    applyCoupon: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    shipperInfo: {
      type: Object,
      required: true,
    },
    shipper_date: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

customerOrder.index({
  "shippingInfo.name": "regex",
  delivery_status: "regex",
});

module.exports = model("customerOrders", customerOrder);
