const company = require("../models/company.model");
const { getUserIDFromAccessToken } = require('../utils/token');
const { AWAIT_VERIFICATION } = require('../constants/VERIFICATION.STATE');



const completeCompanyProfile = async (req, res) => {
    
    try {

        const locationData = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        const companyData = {
            accountID: getUserIDFromAccessToken(req),
            name: req.body.name,
            registrationNo: req.body.registrationNo,
            contactNo: req.body.contactNo,
            address: req.body.address,
            location: locationData,
            email: req.body.email,
            sector: req.body.sector,
            registrationURL: req.body.registrationURL,
            verificationState: AWAIT_VERIFICATION
        }
        await company.create(companyData)
        return res.status(201).send({ code: 201, message: "Profile Data added Successfully." });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
};


const verifyCompany = async (req, res) => {
    const companyId=req.body._id;
    console.log(companyId)
    const verificationState=req.body.verificationState;
    const savedCompany = await company.find({_id: companyId});
    console.log(savedCompany)
    if (savedCompany.length !== 1) {
        return res.status(404).send({ code: 404, error: "The company was not found." });
    }
    await company.findOneAndUpdate({ _id: companyId }, { verificationState: verificationState })
    return res.status(200).send({ result: 'success', code: 200, message:"Company was verified" });
}

module.exports = {
    completeCompanyProfile,
    verifyCompany
};
