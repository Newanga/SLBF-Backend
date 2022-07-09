const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const auth = require("../models/auth.model");
const citizen = require("../models/citizen.model");
const roles = require('../constants/ROLES')
const { getUserIDFromAccessToken } = require('../utils/token');
const { AWAIT_VERIFICATION, VERIFIED } = require('../constants/VERIFICATION.STATE');

const {toXml} = require('xml-vs-js/promises')


const completeCitizenProfile = async (req, res) => {

    try {
        const documentData = {
            birthCertficateURL: req.body.birthCertficateURL,
            policeReportURL: req.body.policeReportURL,
            cvURL: req.body.cvURL,
            passportURL: req.body.passportURL
        }

        const locationData = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

        const addressData = {
            streetNo: req.body.streetNo,
            streetName: req.body.streetName,
            city: req.body.city,
            province: req.body.province
        }

        const citizenData = {
            userID: getUserIDFromAccessToken(req),
            nationalID: req.body.nationalID,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profession: req.body.profession,
            yearsOfExperience: req.body.yearsOfExperience,
            dob: req.body.dob,
            address: addressData,
            documents: documentData,
            address: addressData,
            curreentLocation: locationData,
            photoURL: req.body.photoURL,
            verificationState: AWAIT_VERIFICATION
        }


        await citizen.create(citizenData)
        return res.status(201).send({ code: 201, message: "Profile Data added Successfully." });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
}

const updateCitizenProfile = async (req, res) => {
    const citizenId = getUserIDFromAccessToken(req);
    const savedcitizen = await citizen.find({ id: citizenId });
    if (savedcitizen.length !== 1) {
        return res.status(404).send({ result: 'error', code: 404, error: "The citizen was not found." });
    }
    await citizen.findOneAndUpdate({ id: citizenId }, { currentLocation: {...res.body} })
    return res.status(200).send({ result: 'success', code: 200, message: "Citizen data was Updated Successfully" });
}

const getCitizenByNationalID = async (req, res) => {
    try {
        var id = req.params.id
        console.log(id)
        const savedcitizen = await citizen.findOne({ nationalID: id })
        if (savedcitizen.length === 0) {
            return res.status(404).send({ code: 404, error: "The citizen was not found." });
        }
        return res.status(200).send({ result: 'success', code: 200, data: savedcitizen });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
}

const getCitizenByID = async (req, res) => {
    try {
        var id = req.params.id
        console.log(id)
        const savedcitizen = await citizen.findOne({id});
        console.log(savedcitizen)
        if (savedcitizen.length === 0) {
            return res.status(404).send({ code: 404, error: "The citizen was not found." });
        }
        return res.status(200).send({ result: 'success', code: 200, data: savedcitizen });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
}

const getCitizensByQualification = async (req, res) => {
    try {
        const profession = req.query.profession || '';
        const experience = req.query.experience || '';
        let searchFilters = {};
        if (profession) {
            searchFilters.profession = profession;
        }
        if (experience) {
            searchFilters.yearsOfExperience = experience;
        }

        const pageSize = req.query.page || 1;
        const pageLimit = req.query.limit || 10;
        const options = {
            page: pageSize,
            limit: pageLimit
        };

        const citizens = await citizen.paginate(
            {
                ...searchFilters,
                verificationState: VERIFIED
            },
            options
        )
        const result = { "result": "success", "code": 200, "data": citizens }
        console.log(req.headers['accept'])
        const clientAcceptFormat = req.headers['accept']==='application/xml'? await toXml(result.data, {}) : result
        return res.status(200).send(clientAcceptFormat);

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
}

const removeCitizenFromSystem = async (req, res) => {
    try {
        var id = req.params.id
        const savedcitizen = await citizen.findOne({ _id: id });
        if (savedcitizen.length === 0) {
            return res.status(404).send({ code: 404, error: "The citizen was not found." });
        }
        const userID = savedcitizen.userID.toString();
        await auth.findByIdAndRemove({ _id: userID })
        await citizen.findByIdAndRemove({ _id: id })
        return res.status(200).send({ result: 'success', code: 200, message: "Citizen was removed from the system" });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }
}

const verifyCitizen = async (req, res) => {
    try {
        const citizenId = req.body._id;
        const verificationState = req.body.verificationState;
        const savedcitizen = await citizen.find({ _id: citizenId });
        if (savedcitizen.length !== 1) {
            return res.status(404).send({ code: 404, error: "The citizen was not found." });
        }
        await citizen.findOneAndUpdate({ _id: citizenId }, { verificationState: verificationState })
        return res.status(200).send({ result: 'success', code: 200, message: "Citizen was verified" });
    } catch (error) {
        return res.status(500).send({ result: 'error', code: 500, message: error.message });
    }

}


module.exports = {
    completeCitizenProfile,
    updateCitizenProfile,
    getCitizenByNationalID,
    getCitizensByQualification,
    removeCitizenFromSystem,
    verifyCitizen,
    getCitizenByID

};
