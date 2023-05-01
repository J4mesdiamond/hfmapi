const mongoose = require("mongoose");

const HfmScehma = new mongoose.Schema(
    {
        fname: String,
        lname: String, 
        uname: String, 
        email: { type: String, unique: true }, 
        pass: String, 
        conpass: String,
        accountBalance: String 
    },
    {
        collection: "Hfm",
    }
);
mongoose.model("Hfm", HfmScehma);