const express = require("express");
const Doner = require("../models/Doner");
const router = express.Router();
const authentication = require("../middleware/DonerMiddleware");
router.use(express.json());

router.get("/api/doner", async (req, res) => {
  res.send("hello doner");
});

// ---------------- Register New Doner --------------------------------
router.post("/api/registerdoner", async (req, res) => {
  const { firstname, lastname, email, phoneno, password, address } = req.body;
  const DonerExists = await Doner.find({ email });

  try {
    if (DonerExists.length > 0) {
      res.status(409).json("email already exist !!");
    } else {
      const newDoner = new Doner({
        firstname,
        lastname,
        email,
        phoneno,
        address,
        password,
      });

      await newDoner.save();
      res.status(201).json("Registered Successfully");
    }
  } catch (e) {
    console.log(e);
  }
});

// ---------------- Login Doner --------------------------------
router.post("/api/logindoner", async (req, res) => {
  const { Email, Password } = req.body;
  const FindDoner = await Doner.findOne({ email: Email });

  try {
    if (!FindDoner) {
      res.status(400).json("Email not found");
    } else {
      if (Password == FindDoner.password) {
        const token = await FindDoner.generateToken();
        // res.cookie("jwt_doner_token", token, {
        //   expires: new Date(Date.now() + 86400000),
        //   httpOnly: false,
        // });
        res.status(200).json({
          donerToken: token,
          DonerId: FindDoner._id,
        });
      } else {
        res.status(401).json("Login failed Invalid Cradentials");
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// ---------------- Donate Medicine --------------------------------
router.post("/api/donatemedicine", async (req, res) => {
  const {
    brandName,
    genericName,
    expireDate,
    medicineType,
    quantity,
    DonerId,
  } = req.body;
  try {
    const newDonationMedicine = {
      MedicineDonerId: DonerId,
      brandName,
      genericName,
      expireDate,
      medicineType,
      quantity,
    };
    const findDoner = await Doner.findOne({ _id: DonerId });
    const existMedicinesList = findDoner.medicineList;
    let alreadyExists = false;
    existMedicinesList.forEach((medicine) => {
      if (
        medicine.brandName == brandName &&
        medicine.genericName == genericName &&
        medicine.expireDate == expireDate &&
        medicine.medicineType == medicineType &&
        medicine.quantity == quantity
      ) {
        alreadyExists = true;
      }
    });

    if (alreadyExists) {
      res.status(403).json("Medicine Already Donated !!");
    } else {
      findDoner.medicineList =
        findDoner.medicineList.concat(newDonationMedicine);
      await findDoner.save();
      res.status(201).json("Thank you for Donation");
    }
  } catch (e) {
    console.log(e);
  }
});

// ---------------- Get Donated Medicine By You --------------------------------
router.get("/api/getdonatedmedicine/:id", async (req, res) => {
  try {
    const DonerData = await Doner.findOne({
      _id: req.params.id,
    });
    
    res.status(200).json(DonerData.medicineList);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;

// ---------------- All Donated Medicines --------------------------------
router.get("/api/allmedicines", async (req, res) => {
  try {
    let allMedicineList = [];
    const allDoner = await Doner.find();
    for (let i = 0; i < allDoner.length; i++) {
      allMedicineList.push(allDoner[i].medicineList);
    }

    if (allMedicineList.length > 0) {
      allMedicineList = allMedicineList.flat();

      allMedicineList.sort((a, b) => b.entryTime - a.entryTime);

      res.status(200).send(allMedicineList);
    } else {
      res.status(300).send("No Medicine Donated");
    }
  } catch (e) {
    res.status(300).send("Somthing Went Wrong");
    console.log(e);
  }
});

// ---------------- Logout Doner --------------------------------
router.get("/api/logoutdoner", (req, res) => {
  res.clearCookie("jwt_doner_token");
  res.status(200).send("Logout Successfully");
});

module.exports = router;
