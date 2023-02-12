import passport from "passport";
import { createOrfindUserService } from "../services/userServices";
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      state: true,
      accessType: "offline",
      prompt: "consent",
    },
    function verify(
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      profile.accessToken = accessToken;
      try {
        const user = {
          Email: profile.emails[0].value,
          Role: "guest",
          Provider: "google",
          Password: profile.id,
        };
        createOrfindUserService(user);
        done(null, profile);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "api/auth/github/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      profile.accessToken = accessToken;
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});
