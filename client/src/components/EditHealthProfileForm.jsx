import React, { useState, useEffect } from 'react';
import styles from './HealthProfileForm.module.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditHealthProfileForm = () => {
    const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState({
    userId: '',
    medicalHistory: '',
    fitnessLevel: '',
    dietaryPreferences: '',
    wellnessGoals: ''
  });
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setProfile(prevProfile => ({
        ...prevProfile,
        userId: userId
      }));
      fetchProfile(userId);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/profile/${userId}`);
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4000/api/profile/${profile.userId}`;
      const updatedProfile = { ...profile };
      delete updatedProfile._id; // Remove _id if present
      const response = await axios.put(url, updatedProfile);
      console.log('Profile updated:', response.data);
      navigate("/");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Qriocity</h1>
        <button className={styles.white1_btn}><a href="/">Back</a></button>
        <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
      </nav>
      <div className={styles.formContainer}>
        <h2>Edit Your Health Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="medicalHistory">Medical History:</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={profile.medicalHistory}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fitnessLevel">Fitness Level:</label>
            <input
              type="text"
              id="fitnessLevel"
              name="fitnessLevel"
              value={profile.fitnessLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
            <input
              type="text"
              id="dietaryPreferences"
              name="dietaryPreferences"
              value={profile.dietaryPreferences}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="wellnessGoals">Wellness Goals:</label>
            <input
              type="text"
              id="wellnessGoals"
              name="wellnessGoals"
              value={profile.wellnessGoals}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditHealthProfileForm;
