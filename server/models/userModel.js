const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true

    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

//generating random username for each user using email automatically
userSchema.pre('save', function (next) {
  if (!this.username) {
    const emailPrefix = this.email.split('@')[0];
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    this.username = `${emailPrefix}_${randomNum}`;
  }
  next();
});

const User =  mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;