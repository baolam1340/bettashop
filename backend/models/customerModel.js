const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    addresses: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        addressType: {
          type: String,
        },
      },
    ],
    method: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

customerSchema.index({
  name: "text",
  email: "regex",
});

customerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("customers", customerSchema);
