const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Client = require('../models/Client');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let client = await Client.findOne({ googleId: profile.id });
    
    if (!client) {
      client = new Client({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePicture: profile.photos[0]?.value
      });
      await client.save();
    }
    
    return done(null, client);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((client, done) => {
  done(null, client.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const client = await Client.findById(id);
    done(null, client);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
