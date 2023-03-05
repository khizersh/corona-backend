const express = require("express");
const router = express.Router();
const Information = require("../models/InformationSchema");

const path = "./csv/user.csv";

router.post("/save", async (req, res) => {
  const request = new Information(req.body);
  try {
    const dbUser = await Information.exists({ email: request.email });
    if (dbUser != null) {
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    } else {
      return res
        .send({ status: 9999, message: "Email not exist!" })
        .status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/signin", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/user.csv";

  try {
    if (body.email && body.password) {
      const isExistEmail = await Information.findOne({
        email: body.email,
        password: body.password,
      });

      if (isExistEmail) {
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/find", async (request, response) => {
  const user = new User(request.body);

  try {
    const data = await Information.find({ email: user.email });
    response.send(data);
  } catch (error) {
    console.log("error : ", error);
    response.status(500).send(error);
  }
});

module.exports = router;
