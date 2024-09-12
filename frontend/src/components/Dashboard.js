import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/auth/user') // Endpoint to get user data
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
