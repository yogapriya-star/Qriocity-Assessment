import React, { useState, useEffect } from 'react';
import styles from './HealthProfileForm.module.css'; // Import CSS styles for your form
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRemainder = () => {
    const [profile, setProfile] = useState({
        userId: '',
        goalName: '',
        description: '',
        dateTime: new Date().toISOString().slice(0, 16) // Initialize with current datetime in format yyyy-mm-ddThh:mm
    });
    const navigate = useNavigate();
    const [minDateTime, setMinDateTime] = useState(new Date().toISOString().slice(0, 16));

    useEffect(() => {
        // Get userId from localStorage when component mounts
        const userId = localStorage.getItem('userId');
        if (userId) {
            setProfile(prevProfile => ({
                ...prevProfile,
                userId: userId
            }));
        }

        // Update minDateTime to current datetime whenever component re-renders
        const updateDateTime = () => {
            const currentDateTime = new Date().toISOString().slice(0, 16);
            setMinDateTime(currentDateTime);
            setProfile(prevProfile => ({
                ...prevProfile,
                dateTime: currentDateTime
            }));
        };

        updateDateTime();

        const intervalId = setInterval(updateDateTime, 60000); // Update every minute to keep it current

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://qriocity-assessment-5.onrender.com/api/remainder";
            const response = await axios.post(url, profile);
            navigate("/");
            console.log('Form submitted:', profile);
            // Reset form fields after successful submission
            setProfile({
                userId: profile.userId,
                goalName: '',
                description: '',
                dateTime: new Date().toISOString().slice(0, 16) // Reset dateTime to current datetime
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
                <h2>Set Reminder</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="goalName">Goal Name:</label>
                        <textarea
                            id="goalName"
                            name="goalName"
                            value={profile.goalName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dateTime">Set Date and Time:</label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            name="dateTime"
                            value={profile.dateTime}
                            onChange={handleChange}
                            min={minDateTime} // Set minimum date and time as current datetime
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddRemainder;
