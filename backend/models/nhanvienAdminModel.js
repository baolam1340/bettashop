const { Schema, model } = require("mongoose");
const nhanvienAdminSchema = new Schema(
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
    method: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "nhanvien_admin",
    },
  },
  { timestamps: true }
);

module.exports = model("nhanvienadmins", nhanvienAdminSchema);
