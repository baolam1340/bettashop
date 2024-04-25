const { Schema, model } = require("mongoose");

const nhacungcapSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

nhacungcapSchema.index({
  name: "text",
});

module.exports = model("nhacungcap", nhacungcapSchema);
