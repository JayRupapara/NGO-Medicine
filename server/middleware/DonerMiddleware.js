const Doner = require("../models/Doner");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.jwt_doner_token;

    const verifyToken = await jwt.verify(token, process.env.Token_Secret);

    const currentDoner = await Doner.findOne({
      _id: verifyToken.id,
      // "Tokens:token": token,
    });

    if (!currentDoner) {
      res.status(401);
      throw new Error("Doner not found");
    }

    req.currentDoner = currentDoner;
    req.id = currentDoner._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = authentication;
