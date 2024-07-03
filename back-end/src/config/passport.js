import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import pkg from 'passport-local';
const { Strategy: LocalStrategy } = pkg;

import Usuario from "../models/Usuario.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's Usuario
      const user = await Usuario.findOne({ email: email });
      
      if (!user) {
        return done(null, false, { message: "Not Usuario found." });
      }

      // Match Password's Usuario
      const isMatch = await user.matchPassword(password);
      if (!isMatch){
        console.log("llega");
        return done(null, false, { message: "Incorrect Password." });
      }
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});
