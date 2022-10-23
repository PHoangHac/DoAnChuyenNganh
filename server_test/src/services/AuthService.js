import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const encodedToken = (id) => {
  return jwt.sign(
    {
      iss: "hoang hac",
      sub: id,
      // iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SCERET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

const AuthService = {
  SignUpUser: async (data, email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = {};
        let CheckkUserEmail = await db.User.findOne({
          where: { email: email },
        });
        if (!CheckkUserEmail) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(data.password, salt);
          await db.User.create({
            email: data.email,
            password: hash,
            name: data.name,
            phone: data.phone,
            roleName: data.roleName,
          });
          userData.errCode = 0;
          userData.errMessage = "Register successfully !";
        } else {
          userData.errCode = 1;
          userData.errMessage = "Email already exists in the system !";
        }

        resolve(userData);
      } catch (e) {
        reject(e);
      }
    });
  },

  SignInUser: (email, password) => {
    return new Promise(async (resolve, rejct) => {
      try {
        const userData = {};
        // Check email
        // let UserEmail = await db.User.findOne({
        //   where: { email: email },
        // });
        if (email && password) {
          let user = await db.User.findOne({
            attributes: ["id", "email", "password", "name", "roleName"],
            where: { email: email },
            raw: true,
          });
          if (user) {
            let validPassword = await bcrypt.compareSync(
              password,
              user.password
            );
            if (validPassword) {
              // let jwtToken = jwt.sign(
              //   {
              //     id: user.id,
              //     email: user.email,
              //   },
              //   process.env.JWT_SCERET_KEY
              // );
              let jwtToken = encodedToken(user.id);
              userData.errCode = 0;
              userData.errMessage = "Login Success!";
              // userData.user = user;
              // userData.token = "Bearer " + jwtToken;
              userData.token = jwtToken;
              delete user.password;
              userData.user = user;
            } else {
              userData.errCode = 1;
              userData.errMessage = "Wrong password !";
            }
          } else {
            userData.errCode = 2;
            userData.errMessage = "can't find this email is system !";
          }
        } else {
          userData.errCode = 3;
          userData.errMessage = "Field is empty !";
        }
        resolve(userData);
      } catch (e) {
        rejct(e);
      }
    });
  },
  GetAllUser: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let users = db.User.findAll({
          raw: true,
        });
        resolve(users);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default AuthService;
