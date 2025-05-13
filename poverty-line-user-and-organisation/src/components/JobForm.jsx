import { useState } from 'react';
import '../styles/UserForm.css';

function JobForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/post_job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Job Created: ' + result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Check console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form-container">
      <label htmlFor="JobTitle">Job Title:</label><br />
      <input name="title" placeholder="Job Title" onChange={handleChange} />
      <br /><br />
      <label htmlFor="description">Job Description:</label><br />
      <textarea name="description" placeholder="Job Description" onChange={handleChange} />
      <br /><br />
      <label htmlFor="location">Job Location:</label><br />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <br /><br />
      <label htmlFor="salary">Job Salary:</label><br />
      <input name="salary" placeholder="Salary" onChange={handleChange} />
      <br /><br />
      <button type="submit">Post Job</button>
    </form>
  );
}

export default JobForm;
