// import db from "../models/index";
import AuthService from "../services/AuthService.js";

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

    if (email == "" || password == "") {
      return res.status(500).json({
        errCode: 1,
        message: "Field is empty!!",
      });
    }

    let userData = await AuthService.SignInUser(email, password);
    console.log(typeof userData);
    return res.status(200).json({
      jwtToken: userData.token,
      // errCode: userData.errCode,
      // message: userData.errMessage,
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
};

export default authController;
