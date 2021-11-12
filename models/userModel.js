const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// * This i learned :-)

// you can access these using the user model object
UserSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

UserSchema.methods.comparePassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}

UserSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}

module.exports = mongoose.model('User', UserSchema);

/*

* TODO :
    ? Add CreatedAt
    ? name

 */

