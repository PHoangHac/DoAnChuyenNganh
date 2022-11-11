// import db from "../models/index";
import AuthService from "../services/AuthService.js";
import db from "../models/index";

const authController = {
  //register
  registerUser: async (req, res) => {
    let email = req.body.email;
    let data = req.body;
    let userData = await AuthService.SignUpUser(data, email);
    return res
      .status(200)
      .json({ errCode: userData.errCode, message: userData.errMessage });
  },
  signin: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await AuthService.SignInUser(email, password);
    // console.log(typeof userData);
    return res.status(200).json({
      jwtToken: userData.token,
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user,
      // ? userData.user
      // : { message: "Wrong something!!!" },
    });
  },
  Logout: (req, res) => {
    try {
      if (req.headers == null || req.headers.authorization == "") {
        // const token = req.headers.authorization;
        return res.status(500).send({ message: "token not valid !" });
        // console.log(token);
      } else {
        return res.status(200).send({ message: "Logout success full !" });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  DisplayAllUser: async (req, res) => {
    let data = await AuthService.GetAllUser();
    return res.status(200).send(data);
  },
  UpdateUser: async (req, res) => {
    const { id } = req.params;
    const image = req.file.path;
    const data = req.body;
    console.log(image);
    try {
      const FindUser = await db.User.findOne({
        where: { id: id },
      });
      if (FindUser) {
        FindUser.image = image;
        FindUser.name = data.name;
        FindUser.phone = data.phone;
        FindUser.email = data.email;
        await FindUser.save();
        return res.status(200).send(FindUser);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  OneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const FindUser = await db.User.findOne({
        where: { id: id },
      });
      if (FindUser) {
        return res.status(200).send(FindUser);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  DeleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const FindUser = await db.User.findOne({
        where: { id: id },
      });
      if (FindUser) {
        FindUser.destroy();
        return res.status(200).json({ msg: "Delete Success !" });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

export default authController;
