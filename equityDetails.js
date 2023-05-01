const mongoose = require("mongoose")

const equityDetailsSchema = new mongoose.Schema({
    numCT:{
        type:String,
        required: true
    },
    numOT:{
        type:String,
        required:true
    },
    posCT:{
        type:String,
        required:true
    },
    negCT:{
        type:String,
        required:true
    },
    profit:{
        type:String,
        required:true
    },
    avePro:{
        type:String,
        required:true
    },
    aveLoss:{
        type:String,
        required:true
    },
    aveLOS:{
        type:String,
        required:true
    },
    aveTL:{
        type:String,
        required:true
    },
    balance:{
        type:String,
        required:true
    },
    equity:{
        type:String,
        required:true
    },
    initial:{
        type:String,
        required:true
    },
    tDeposit:{
        type:String,
        required:true
    },
    Twithdraw:{
        type:String,
        required:true
    },
    profitBOE:{
        type:String,
        required:true
    }
})

const equityDetails = new mongoose.model("equityDetails" , equityDetailsSchema)

module.exports = equityDetails;