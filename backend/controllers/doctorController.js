const Doctor = require("../models/Doctor");

// @desc Get all doctors
const getDoctors = async (req, res) => {
    const keyword = req.query.keyword
        ? { $or: [{ name: new RegExp(req.query.keyword, "i") }, { specialisation: new RegExp(req.query.keyword, "i") }] }
        : {};
    const doctors = await Doctor.find({ ...keyword });
    res.status(200).json(doctors);
};

// @desc Add a doctor
const addDoctor = async (req, res) => {
    const { name, degree, hospital, specialisation, status } = req.body;
    const doctor = new Doctor({ name, degree, hospital, specialisation, status });
    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
};

// @desc Update a doctor
const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, degree, hospital, specialisation, status } = req.body;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.name = name;
    doctor.degree = degree;
    doctor.hospital = hospital;
    doctor.specialisation = specialisation;
    doctor.status = status;

    const updatedDoctor = await doctor.save();
    res.status(200).json(updatedDoctor);
};

// @desc Delete a doctor
const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.remove();
    res.status(200).json({ message: "Doctor removed" });
};

module.exports = { getDoctors, addDoctor, updateDoctor, deleteDoctor };
