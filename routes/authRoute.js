const express = require('express');
const route = express.Router();

const UserModel = require('../models/userModel');


route.post('/register', async (req, res) => {
    try {
        // encrypt password before saving
        const user = new UserModel(req.body);
        user.password = await user.encryptPassword(req.body.password);

        await user.save();

        res.status(200).json({
            message: 'User created successfully'
        });
    } catch (err) {
        res.json(err);
    }

})

route.post('/login', async (req, res) => {
    const loginDetails = req.body;
    console.log(loginDetails)

    try {

        // find with email
        const user = await UserModel.findOne({ email: loginDetails.email })
        console.log("user   \n")
        console.log(user)

        // if not found : throw error
        if (!user) {
            res.status(401).json({
                message: 'Email does not Exist'
            });
        }

        // if found : compare by checking password
        const match = await user.comparePassword(loginDetails.password, user.password);

        // if its a match : generate token and send a response
        // else : throw 'Invalid Password' error
        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "sidharth-74659", {
                expiresIn: "5s"
            })

            if (token) {
                res.status(200).json({
                    message: 'success',
                    token,
                    userCredentials: user
                });
            } 
            // Why would the token be null?
        } else {
            res.status(401).json({
                message: 'Invalid password'
            });
        }

    } catch (err) {
        // console.log(err);

        res.status(500).json({
            message: 'Error logging in'
        });
    }
})
module.exports = route;


/*
* SAMPLE DATA :
 ? To register

    {
        "email" : "sidharth@74659",
        "password" : "123789"
    }

    {
        "email" : "rakesh@74659",
        "password" : "9014244"
    }

*/