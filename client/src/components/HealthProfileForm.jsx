import React, { useState, useEffect } from 'react';
import styles from './HealthProfileForm.module.css'; // Import CSS styles for your form
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const HealthProfileForm = () => {
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
    // Get userId from localStorage when component mounts
    const userId = localStorage.getItem('userId');
    if (userId) {
      setProfile(prevProfile => ({
        ...prevProfile,
        userId: userId
      }));
    }
  }, []);

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
        const url = "http://localhost:4000/api/profile";
            const {profile:res} = await axios.post(url,profile);
            navigate("/")
      // Example: Send data to a backend endpoint using axios (replace with your actual endpoint)
      // const response = await axios.post('/api/profiles', profile);
      console.log('Form submitted:', profile);
      // Reset form fields after successful submission
      setProfile({
        userId: profile.userId, // Keep userId as it is
        medicalHistory: '',
        fitnessLevel: '',
        dietaryPreferences: '',
        wellnessGoals: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error as needed
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Qriocity</h1>
        <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
      </nav>
      <div className={styles.formContainer}>
      <h2>Create Your Health Profile</h2>
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
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
    </div>
    
  );
};

export default HealthProfileForm;
