import React from 'react';
import { Link } from 'react-router-dom';

function DoctorList({ doctors, setDoctors }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/doctors/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Qualification</th>
            <th>Hospital</th>
            <th>Specialization</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor._id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.qualification}</td>
              <td>{doctor.hospital}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.status}</td>
              <td>
                <Link to={`/edit/${doctor._id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(doctor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add">
        <button>Add Doctor</button>
      </Link>
    </div>
  );
}

export default DoctorList;
