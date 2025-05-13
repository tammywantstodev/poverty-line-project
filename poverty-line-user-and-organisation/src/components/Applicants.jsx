import { useEffect, useState } from 'react';

function Applicants() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_applications', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div style={{ color: 'black' }}>
      <h1>Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <strong>{app.username}</strong> applied for <strong>{app.job_title}</strong> on {app.timestamp}
              <br />
              Email: {app.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Applicants;
