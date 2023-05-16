const express = require("express")
const router = express.Router();
require("./useDetails")
const mongoose = require("mongoose");
const User=mongoose.model("Hfm")


//Get records
router.get("/registerData", async (req,res) => {
    try {
        const result = await User.find()
        if (!result) {
            res.json({
                status:"FAILED",
                message:"equityDetails Details Not Registered Successfully"
            })
        } 
        else {
            res.json({
                status:"SUCCESS",
                message:"equityDetails Details Registered Successfully",
                data:result
            })
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router