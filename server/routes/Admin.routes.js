const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Doner = require("../models/Doner");
const AdminAuthentication = require("../middleware/AdminMiddleware");

// ---------------- Register New Admin --------------------------------
router.post("/addadmin", async (req, res) => {
  const AdminExists = await Admin.find({ ngoEmail: req.body.ngoemail });
  try {
    if (AdminExists.length > 0) {
      res.status(409).json("email already exist !!");
    } else {
      const newAdmin = await new Admin({
        ngoName: req.body.ngoname,
        ngoEmail: req.body.ngoemail,
        ngoRegNo: req.body.ngoregno,
        ngoContactNo: req.body.ngocontac,
        ngoAddress: req.body.ngoaddress,
        password: req.body.ngopass,
      });

      await newAdmin.save();
      res.status(201).json("Registered Successfully");
    }
  } catch (e) {
    console.log(e);
  }
});

// ---------------- Login Admin --------------------------------
router.post("/loginadmin", async (req, res) => {
  const { Email, Password } = req.body;

  const FindAdmin = await Admin.findOne({ ngoEmail: Email });

  try {
    if (!FindAdmin) {
      res.status(400).json("Email not found");
    } else {
      if (Password == FindAdmin.password) {
        const token = await FindAdmin.generateToken();

        // res.cookie("jwt_admin_token", token, {
        //   expires: new Date(Date.now() + 86400000),
        //   httpOnly: false,
        // });

        res.status(200).json({
          tokenVal: token,
          AdminId: FindAdmin._id,
        });
      } else {
        res.status(401).json("Login failed Invalid Cradentials");
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// ---------------- Get Medicine By Id --------------------------------
router.get("/medicine/:id", async (req, res) => {
  try {
    const medicineId = req.params.id;
    const allMedicineList = [];
    const allDoner = await Doner.find();
    for (let i = 0; i < allDoner.length; i++) {
      allMedicineList.push(allDoner[i].medicineList);
    }

    const flatData = allMedicineList.flat();
    var data = flatData.filter((d) => d._id == medicineId);

    const currentDonerInfo = await Doner.findOne(
      {
        _id: data[0].MedicineDonerId,
      },
      {
        password: 0,
        registerDate: 0,
        medicineList: 0,
        Tokens: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    data = [...data, currentDonerInfo];

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(404).send("Somthing Went Wrong !!");
  }
});

// ---------------- Update Medicine --------------------------------
router.post("/updatemedicine", async (req, res) => {
  try {
    const { id, AdminId } = req.body;

    const CurrentAdmin = await Admin.findOne({ _id: AdminId });

    let allMedicineList = [];
    const allDoner = await Doner.find();

    for (let i = 0; i < allDoner.length; i++) {
      allMedicineList.push(allDoner[i].medicineList);
    }

    allMedicineList = allMedicineList.flat();
    const currentMedicine = allMedicineList.filter((med) => med._id == id);

    const medicineDoner = await Doner.findOne({
      _id: currentMedicine[0].MedicineDonerId,
    });

    const upDatedMedicineData = medicineDoner.medicineList.map((med) => {
      if (med._id == id) {
        med.collected = true;
        med.recieverName = CurrentAdmin.ngoName;
        med.recieverEmail = CurrentAdmin.ngoEmail;
        med.recieverRegistrationNo = CurrentAdmin.ngoRegNo;
        med.recieverAddress = CurrentAdmin.ngoAddress;
        med.recieverContact = CurrentAdmin.ngoContactNo;
      }

      return med;
    });

    medicineDoner.medicineList = upDatedMedicineData;
    medicineDoner.save();
    res.status(200).send({ msg: "Successfully Updated" });
  } catch (e) {
    console.log(e);
    res.status(404).send("Somthing Went Wrong !!");
  }
});

// ---------------- Logout Medicine --------------------------------
router.get("/logoutadmin", (req, res) => {
  res.clearCookie("jwt_admin_token");
  res.status(200).send("Logout Successfully");
});

module.exports = router;
