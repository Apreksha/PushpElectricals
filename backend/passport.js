const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy; 
const passport = require("passport");

const GOOGLE_CLIENT_ID = "348443964088-0eb6jbb7i6n4fpog0inplgrk2dt3gpls.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "202401559095229";
const FACEBOOK_APP_SECRET = "1e94a7e4021b6a2a2a04540a6d95dc3d";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile)
}
));

passport.serializeUser((user, done)=>{
    done(null, user)
});

passport.deserializeUser((user, done)=>{
    done(null, user)
});