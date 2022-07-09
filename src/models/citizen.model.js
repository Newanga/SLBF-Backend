const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const documentSchema = new mongoose.Schema({
    birthCertficateURL: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    policeReportURL: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cvURL: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    passportURL: {
        type: mongoose.Schema.Types.String,
        required: true
    },
})

const locationSchema = new mongoose.Schema({
    latitude: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    longitude: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

const addressSchema = new mongoose.Schema({
    streetNo: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    streetName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    province: {
        type: mongoose.Schema.Types.String,
        required: true
    },

})

const citizenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    nationalID: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    firstname:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    lastname:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    profession:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    yearsOfExperience:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    dob:{
        type: mongoose.Schema.Types.Date,
        required: true
    },
    address:{
        type: mongoose.Schema.Types.Date,
        required: true
    },
    documents :{
        type: documentSchema,
        required: true
    },
    address :{
        type: addressSchema,
        required: true
    },
    curreentLocation:{
        type: locationSchema,
        required: true
    },
    photoURL:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    verificationState:{
        type: mongoose.Schema.Types.String,
        required:true
    }

})

citizenSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('citizen', citizenSchema)