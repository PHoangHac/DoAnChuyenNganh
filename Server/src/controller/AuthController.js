// const { resolve } = require("app-root-path");
// var crypto = require("crypto-js");
const bcrypt = require("bcrypt");
import db from "../models/index";

import ServiceApiService from "../services/apiService";

// --------------------------Change -----------------------//
const authController = {
  // Register
  Register: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      let Users = await db.User.create({
        ...req.body,
        password: hash,
      });
      return res.status(200).json(Users);
    } catch (e) {
      return res.status(400).json(err);
    }
  },

  Login: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let body = req.body;

    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Chua Truyen Gia Tri!!",
      });
    }
    let userData = await ServiceApiService.UserLogin(email, password, body);
    return res.status(200).json({
      // errCode: 0,
      // message: 'Ok!!',
      // yourEmail: email,
      // yourPassword: password
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user
        ? userData.user
        : { message: "Khong ton tai user nay!!!" },
    });
  },
};

export default authController;
// --------------------------Change -----------------------//
