const mongoose = require('mongoose');
const fs = require('fs');

// Define the doctor schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  hospital: { type: String, required: true },
  specialization: { type: String, required: true },
  status: { type: String, required: true }
});

// Create a model from the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

// Log the contents of the ./models directory
console.log('Files in models directory:', fs.readdirSync('./models'));

// Export the model for use in other files
module.exports = Doctor;
