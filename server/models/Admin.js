const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminSchema = new mongoose.Schema(
  {
    ngoName: {
      type: String,
      require: true,
    },
    ngoEmail: {
      type: String,
      unique: true,
      require: true,
    },
    ngoRegNo: {
      type: String,
      require: true,
    },
    ngoAddress: {
      type: String,
      require: true,
    },
    ngoContactNo: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    registerDate: {
      type: Date,
      default: new Date(),
    },
    Tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

AdminSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.Token_Secret);
  this.Tokens = this.Tokens.concat({ token });
  await this.save();
  return token;
};

const Admin = new mongoose.model("Admin", AdminSchema);

module.exports = Admin;
