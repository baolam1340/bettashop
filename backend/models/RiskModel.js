const { Schema, model } = require("mongoose");

const RiskSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      require: true,
    },
    reason: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("riskmodels", RiskSchema);
