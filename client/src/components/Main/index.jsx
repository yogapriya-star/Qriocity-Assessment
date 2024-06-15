import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const Main = () => {
  const [profileExists, setProfileExists] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remainders, setRemainders] = useState([]);
  const [showRemainders, setShowRemainders] = useState(true); // State to manage the visibility of the "All Remainders" section
  const [showReminder, setShowReminder] = useState(false);


  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const response = await axios.get(`https://qriocity-assessment-5.onrender.com/api/profile/${userId}`);
      if (response.status === 200) {
        const profileData = response.data;
        if (profileData) {
          setProfileExists(true);
          setProfileData(profileData);
        } else {
          setProfileExists(false);
        }
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfileExists(false);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const fetchRemainders = async () => {
    try {
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
  
      const response = await axios.get(`https://qriocity-assessment-5.onrender.com/api/remainder/${userId}`);
      if (response.status === 200) {
        const remainderData = response.data;
  
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const todayRemainders = remainderData.filter(remainder => remainder.dateTime.split('T')[0] === today);
  
        setRemainders(todayRemainders); // Set only today's remainders
      }
    } catch (error) {
      console.error('Error fetching remainders:', error);
    }
  };
  

  useEffect(() => {
    fetchProfile();
    fetchRemainders();
  }, []); // Empty dependency array means this effect runs once on mount

  const closeReminder = () => {
    setShowReminder(false);
    setShowRemainders(false); // Close the "All Remainders" section when the button is clicked
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Qriocity</h1>
        <button className={styles.white1_btn}><a href="/add-remainder">Add Remainder</a></button>
        <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
      </nav>
      {showRemainders && ( // Conditionally render the "All Remainders" section
        <div className={styles.remainders_list}>
          <h2>
            All Remainders
            <button className={styles.delete_btn} onClick={closeReminder}>Close</button>
          </h2>
          {remainders.length > 0 ? (
            <ul>
              {remainders.map(remainder => (
                <li key={remainder._id}>
                  <p><strong>Title:</strong> {remainder.goalName}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No remainder found.</p>
          )}
        </div>
      )}
      <div className={styles.content_container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.no_profile}>
              <p>All Remainder List <a href="/all-remainder">All Remainder</a></p>
            </div>
            {profileExists ? (
              <div className={styles.profile_view}>
                <h2>Health Profile</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Dietary Preferences:</strong> {profileData.dietaryPreferences}</p>
                <p><strong>Fitness Level:</strong> {profileData.fitnessLevel}</p>
                <p><strong>Medical History:</strong> {profileData.medicalHistory}</p>
                <p><strong>Wellness Goals:</strong> {profileData.wellnessGoals}</p>
                <button className={styles.edit_btn}><a href="/edit-health-profile">Edit</a></button>
              </div>
            ) : (
              <div className={styles.no_profile}>
                <p>No health profile found. <a href="/health-profile">Create a health profile</a></p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
