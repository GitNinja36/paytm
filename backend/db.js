const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://teslarohit369:ctaPltdyieu1evnr@paytmcluster.3gtne.mongodb.net/");
console.log("mongoDB connected");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    }
})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account
}