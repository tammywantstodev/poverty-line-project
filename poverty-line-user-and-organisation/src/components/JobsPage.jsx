import { useState, useEffect } from 'react';
import '../styles/JobsPage.css'; 

function JobsPage() {
    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
      const fetchJobData= async () =>{
        try {
          const response = await fetch('http://localhost:5000/get_jobs', {
            method: 'GET',
            credentials: 'include', 
          });
          if (response.ok) {
              const data = await response.json();
              setJobs(data);
            } else {
              console.error('Error: ', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        };
      fetchJobData()
    }, []);

    const handleApply = async (jobId) => {
      try {
        const response = await fetch('http://localhost:5000/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ jobId: jobId }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
          alert(result.message || 'Application sent!');
        } else {
          alert(result.error || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Network error occurred.');
      }
    };
  
    return (
      <div style={{ color: 'black' }}>
        <h1>Job Listings</h1> 
        {jobs.map(job => (
          <div key={job.id} className='listing'>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location} — {job.salary}</p>
            <button onClick={() => handleApply(job.id)}>Apply</button>
          </div>
        ))}
      </div>
    );
  }
export default JobsPage
  