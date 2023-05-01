const express = require("express")
const router = express.Router();
const equityDetails = require("./equityDetails") 


//Create Route
router.post("/equityDetails", async (req,res) => {
    console.log(req.body)
    const data = new equityDetails(req.body)
    const result = await data.save()

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
})

//Get records
router.get("/equityDetails", async (req,res) => {
    try {
        const result = await equityDetails.find()
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

//Get Single Record
router.get("/equityDetails/:id", async (req,res) => {
    try {
        const _id = req.params.id
        const result = await equityDetails.findById(_id);
        if (!result) {
            res.json({
                status:"FAILED",
                message:"Record not Found on this ID"
            })
        } 
        else {
            res.json({
                status:"SUCCESS",
                message:"Records found",
                data:result
            })
        }
    } catch (e) {
        console.log(e)
    }
})

//Update Records
router.put("/equityDetails/:id", async (req,res) => {
    try {
        const _id = req.params.id;
        const result = await equityDetails.findByIdAndUpdate(_id,req.body,{new: true});
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not Edited..."
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record Edited successfully..."
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

//Delete Records
router.delete("/equityDetails/:id", async (req,res) => {
    try {
        const _id = req.params.id
        const result = await equityDetails.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status:"FAILED",
                message:"Record has not been Deleted Successfully..."
            })
        } 
        else {
            res.json({
                status:"SUCCESS",
                message:"Record has been Deleted Successfully...",
                data:result
            })
        }
    } catch (e) {
        console.log(e)
    }
})





module.exports = router