const { Schema, model } = require("mongoose");

const requestSchema = new Schema(
  {
    customerId: {
      type: Schema.ObjectId,
      required: true,
    },
   orderId: {
    type: Schema.ObjectId,
      required: true,
   },
   information: {
    type: String,
      required: true,
   }
  },
  { timestamps: true }
);


module.exports = model("requests", requestSchema);
