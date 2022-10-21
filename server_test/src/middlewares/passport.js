const passport = require("passport");
// const JwtStrategy = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/user");
var JwtStrategy = require("passport-jwt").Strategy;
import db from "../models/index";

// const User = require('../models/user')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.JWT_SCERET_KEY,
    },
    async (payload, done) => {
      try {
        const user = await db.User.findOne(payload.id);
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
