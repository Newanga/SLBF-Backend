const bcrypt = require("bcrypt");
const auth = require("../models/auth.model");
const companyProfile = require("../models/company.model");
const citizenProfile = require("../models/citizen.model");
const roles = require('../constants/ROLES')
const util = require('../utils/token');
const { AWAITING_VERIFICATION } = require("../constants/VERIFICATION.STATE");


const login = async (req, res) => {
    try {
        const user = await auth.findOne({ email: req.body.email });

        if (user.length === 0) {
            return res.status(401).send({ result: 'error', code: 401, message: "Unable to Find Account." });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ result: 'error', code: 401, message: "Unauthorized." });
        }

        const role = user.role;
        if ((role === roles.ROLE_COMPANY || roles.ROLE_CITIZEN) && user.emailConfirmed === false) {
            //
            return res.status(200).send({ code: 200, message: "Please Confirm your Email.", redirectURL: "/email-unverified" });
        }

        const userInfo = { email: user.email, userID: user._id, role: user.role }
        const token = util.generateAccessToken(userInfo);
        const profile = (role === roles.ROLE_CITIZEN) ? await citizenProfile.findOne({ accountID: user._id }) : await companyProfile.findOne({ accountID: user._id })

        if ((role === roles.ROLE_CITIZEN || role === roles.ROLE_COMPANY) && profile.length === 0) {
            res.header('access_token', `Bearer ${token}`);
            const redirectURL = (role === roles.ROLE_CITIZEN) ? "/citizen/onboarding" : "/company/onboarding"
            //
            return res.status(200).send({ code: 200, message: "Please complete your profile.", redirectURL });
        }
        else if ((role === roles.ROLE_CITIZEN || role === roles.ROLE_COMPANY) && profile.verificationState === AWAITING_VERIFICATION) {
            //
            return res.status(200).send({ code: 200, message: "Awaiting Account Confirmation by Bureau.", redirectURL: "/wait" });
        }

        res.header('access_token', `Bearer ${token}`);
        res.status(200).send({ code: 200, message: "Authentication Successful!" });
    } catch (error) {
        res.status(500).send({ code: 500, message: error.message });
    }

}



const register = async (req, res) => {
    const user = await auth.find({ email: req.body.email });
    if (user.length !== 0) {
        return res.status(400).send({ result: 'error', code: 400, error: "User already exist" });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAuthuser = {
            email: req.body.email,
            password: hashedPassword,
            emailConfirmed: false,
            role: req.body.role
        };
        await auth.create(newAuthuser);
        return res.status(201).send({ code: 201, message: "User created Successfully." });
        
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
};

module.exports = {
    login,
    register
};

