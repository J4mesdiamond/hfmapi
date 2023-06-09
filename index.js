const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const equityDetails = require("./equityRoutes")
const getUserRoutes = require("./getUserRoutes")

const JWT_SECRET = 
    "jhgvbndjvibu76789oeikrjntu890987y3h4jrtog987yh5jty9h8yh34ur8t90";

mongoose
    .connect(
        "mongodb+srv://footballAPI:ufuoma123@footballapi.hqqfyac.mongodb.net/test"
    )
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.log(err);
    });

require("./useDetails");

const User=mongoose.model("Hfm")

//Register
app.post("/register", async (req, res) => {
    const { fname, lname, uname, email, pass, conpass, accountBalance } = req.body;

    if (pass !== conpass) {
        return res.send({ error: "Password and Confirm Password do not match" });
    }

const encryptedPassword = await bcrypt.hash(pass, 10);
    try {
        const oldUser = await User.findOne({ email });

    if (oldUser) {
        return res.send({ error: "User Exists" });
    }
    await User.create({
        fname,
        lname,
        uname,
        email,
        pass: encryptedPassword,
        conpass,
        accountBalance: 0,
    });

        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});


//Log-In
app.post("/login-user", async (req, res) => {
    const { email, pass } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(pass, user.pass)) {
        const token = jwt.sign({email:user.email}, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else{
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

// userdata
app.post("/userData", async (req, res) => {
const { token } = req.body;
try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
            return "token expired";
        }
        return res;
    });
    
    if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    User.findOne({ email: useremail })
        .then((data) => {
            res.send({ status: "ok", data: data });
        })
        .catch((error) => {
            res.send({ status: "error", data: error });
        });
    } catch (error) {}
});

//Edit UserData
app.post("/edituserData", async (req, res) => {
    const { token } = req.body;
    try {
            const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
            return "token expired";
        }
            return res;
        });

        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
    const useremail = user.email;
        User.findOneAndUpdate(
            { email: useremail },
            { $set: req.body.updatedData }, // Replace 'updatedData' with the updated data you want to set
            { new: true } // Set 'new' to true to return the updated document
        )
        .then((data) => {
            res.send({ status: "ok", data: data });
        })
        .catch((error) => {
            res.send({ status: "error", data: error });
        });
    } catch (error) {}
});



app.use(express.json())
app.use(equityDetails)
app.use(getUserRoutes)


app.listen(4000, () => {
    console.log("Backend Server is running!");
});
