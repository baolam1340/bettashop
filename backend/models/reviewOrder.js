const { Schema, model } = require("mongoose");

const reviewOrderSchema = new Schema(
  {
    orderId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ReviewOrder = model("ReviewOrder", reviewOrderSchema);

module.exports = ReviewOrder;
