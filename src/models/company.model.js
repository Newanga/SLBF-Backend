const mongoose=require('mongoose')

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

const companySchema = new mongoose.Schema({
    accountID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    registrationNo:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    contactNo:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    address:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    location:{
        type: locationSchema,
        required: true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    sector:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    registrationURL:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    verificationState:{
        type: mongoose.Schema.Types.String,
        required:true
    }

})

module.exports=mongoose.model('company',companySchema)