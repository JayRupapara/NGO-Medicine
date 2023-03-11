const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const DonerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    phoneno: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    address: {
      type: String,
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
    medicineList: [
      {
        MedicineDonerId: {
          type: String,
          // required: true,
        },
        brandName: {
          type: String,
          required: true,
        },
        genericName: {
          type: String,
          required: true,
        },
        expireDate: {
          type: String,
          required: true,
        },
        medicineType: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        entryTime: {
          type: Date,
          default: new Date(),
        },
        collected: {
          type: Boolean,
          default: false,
        },
        recieverName: {
          type: String,
        },
        recieverEmail: {
          type: String,
        },
        recieverRegistrationNo: {
          type: String,
        },
        recieverAddress: {
          type: String,
        },
        recieverContact: {
          type: Number,
        },
      },
    ],
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

DonerSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.Token_Secret);
  this.Tokens = this.Tokens.concat({ token });
  await this.save();
  return token;
};

const Doner = new mongoose.model("Doner", DonerSchema);

module.exports = Doner;
