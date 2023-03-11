const Admin = require("../models/Admin");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminAuthentication = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.jwt_admin_token;

    const verifyToken = await jwt.verify(token, process.env.Token_Secret);

    const currentAdmin = await Admin.findOne({
      _id: verifyToken.id,
      // "Tokens:token": token,
    });

    if (!currentAdmin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    req.currentAdmin = currentAdmin;
    req.id = currentAdmin._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = AdminAuthentication;
