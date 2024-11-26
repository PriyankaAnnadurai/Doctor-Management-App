require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Doctor = require("./models/Doctor");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/doctor_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CRUD Routes

// GET all doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single doctor by ID (for edit feature)
app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST a new doctor
app.post("/api/doctors", async (req, res) => {
  const newDoctor = new Doctor(req.body);
  try {
    const doctor = await newDoctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (Edit) a doctor by ID
app.put("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update fields
    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      doctor[key] = updates[key];
    });

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a doctor
app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
