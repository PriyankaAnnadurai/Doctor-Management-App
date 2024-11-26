import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditDoctor = ({ setDoctors }) => {
  const { doctorId } = useParams(); // Get doctorId from URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    qualification: '',
    hospital: '',
    specialization: '',
    status: '',
  });

  // Fetch the doctor data when the component mounts
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error('Failed to fetch doctor data');
        const data = await response.json();
        setForm(data); // Set the fetched doctor data in the form state
      } catch (error) {
        console.error('Error fetching doctor:', error.message);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to update doctor');

      const updatedDoctor = await response.json();
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        )
      );
      navigate('/'); // Redirect to the list page after the update
    } catch (error) {
      console.error('Error updating doctor:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Name"
      />
      <input
        name="qualification"
        value={form.qualification}
        onChange={handleChange}
        required
        placeholder="Qualification"
      />
      <input
        name="hospital"
        value={form.hospital}
        onChange={handleChange}
        required
        placeholder="Hospital"
      />
      <input
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        required
        placeholder="Specialization"
      />
      <input
        name="status"
        value={form.status}
        onChange={handleChange}
        required
        placeholder="Status"
      />
      <button type="submit">Update Doctor</button>
    </form>
  );
};

export default EditDoctor;
