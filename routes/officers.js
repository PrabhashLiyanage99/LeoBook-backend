// routes/student.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'})
let Officer = require("../models/officer");

// Route to add a new student
router.route("/add").post(upload.single('image'), (req, res) => {
    const name = req.body.name;
    const designation = req.body.designation;
    const gender = req.body.gender;
    const batch = req.body.batch;
    const department = req.body.department;
    const birthday = new Date(req.body.birthday);  // Parse birthday correctly
    const officerImage = req.file ? req.file.path : null;  // Get image path from multer

    const newOfficer = new Officer({
        name,
        designation,
        gender,
        batch,
        department,
        birthday,
        officerImage
    });

    newOfficer.save().then(() => {
        res.json("Officer added");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: err.message });
    });
});


// Route to get all students
router.route("/").get((req, res) => {
    Officer.find().then((officers) => {
        res.json(officers);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error: err.message });
    });
});

// Route to update a student by ID
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = {
        name,
        designation,
        gender,
        batch,
        department,
        birthday
    };

    await Student.findByIdAndUpdate(userId, updateStudent)
        .then((update) => {
            res.status(200).send({ status: "User Updated", user: update });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

// Route to delete a student by ID
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User Deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting user", error: err.message });
        });
});

// Route to get a student by ID
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await Student.findById(userId)
        .then((user) => {
            res.status(200).send({ status: "User fetched", user: user });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching user", error: err.message });
        });
});

module.exports = router;