import React, { useState, useEffect } from 'react';
import styles from './HealthProfileForm.module.css'; // Import CSS styles for your form
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllRemainder = () => {
  const [profile, setProfile] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/remainder/${userId}`);
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/remainder/${id}`);
      // Remove the deleted remainder from the profile state
      setProfile(profile.filter(remainder => remainder._id !== id));
    } catch (error) {
      console.error('Error deleting remainder:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchProfile(userId);
  }, []); // Empty dependency array means this effect runs once on mount

  let tableRows = [];
  if (profile.length > 0) {
    profile.forEach((remainder) => {
      tableRows.push(
        <tr key={remainder._id}>
          <td>{remainder.goalName}</td>
          <td>{remainder.description}</td>
          <td>{new Date(remainder.dateTime).toLocaleString()}</td>
          <td>
            <button 
              className={styles.delete_btn} 
              onClick={() => handleDelete(remainder._id)}
            > 
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Qriocity</h1>
        <button className={styles.white1_btn}><a href="/">Back</a></button>
        <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
      </nav>
      <div className={styles.content_container}>
        {profile.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Goal Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        ) : (
          <p>No data found!...</p>
        )}
      </div>
    </div>
  );
};

export default AllRemainder;
