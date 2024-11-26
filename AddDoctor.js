import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDoctor({ setDoctors }) {
  const [doctorData, setDoctorData] = useState({
    name: '',
    qualification: '',
    hospital: '',
    specialization: '',
    status: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData),
    })
      .then((res) => res.json())
      .then((newDoctor) => {
        setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
        // navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={doctorData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="qualification"
          value={doctorData.qualification}
          placeholder="Qualification"
          onChange={handleChange}
        />
        <input
          type="text"
          name="hospital"
          value={doctorData.hospital}
          placeholder="Hospital"
          onChange={handleChange}
        />
        <input
          type="text"
          name="specialization"
          value={doctorData.specialization}
          placeholder="Specialization"
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          value={doctorData.status}
          placeholder="Status"
          onChange={handleChange}
        />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;
