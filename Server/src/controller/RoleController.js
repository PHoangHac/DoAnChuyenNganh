// const { resolve } = require("app-root-path");
// var crypto = require("crypto-js");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
import db from "../models/index";

// --------------------------Change -----------------------//
const roleController = {
  // Create
  CreateRole: async (req, res) => {
    // let getRoles = req.body;
    try {
      const Roles = await db.Role.create({
        roleName: req.body.roleName,
      });
      return res.status(200).json(Roles);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

export default roleController;
// --------------------------Change -----------------------//
