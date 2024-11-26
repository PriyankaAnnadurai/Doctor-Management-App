const express = require("express");
const router = express.Router();
const { getDoctors, addDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorcontroller");

router.route("/").get(getDoctors).post(addDoctor);
router.route("/:id").put(updateDoctor).delete(deleteDoctor);

const Doctor = require('../models/Doctor'); // Import your Doctor model

// GET doctor by ID
router.get('/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  Doctor.findById(doctorId)
    .then((doctor) => res.json(doctor))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// UPDATE doctor by ID
router.put('/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const updateData = req.body;
  Doctor.findByIdAndUpdate(doctorId, updateData, { new: true })
    .then((updatedDoctor) => res.json(updatedDoctor))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;


module.exports = router;
