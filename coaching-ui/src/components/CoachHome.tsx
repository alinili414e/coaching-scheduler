// src/components/CoachHome.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoaches } from "../context/CoachContext"; // Ensure correct import path

const CoachHome = () => {
    const [currentCoachName, setCurrentCoachName] = useState<string>('');
    const [greeting, setGreeting] = useState<string>('');
    const navigate = useNavigate();
    const { coaches, setSelectedCoach } = useCoaches();

    useEffect(() => {
        const date = new Date();
        const hours = date.getHours();
        const greet: string = hours < 12 ? 'Good Morning' :
            hours >= 12 && hours <= 17 ? 'Good Afternoon' : 'Good Evening';

        if (currentCoachName) {
            setGreeting(`${greet}, ${currentCoachName}`);
            const selectedCoach = coaches?.find(coach => coach.name === currentCoachName);
            setSelectedCoach(selectedCoach || null);
        } else {
            setGreeting('Welcome to your dashboard!');
        }
    }, [currentCoachName, coaches, setSelectedCoach]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
        }}>
            <h2>{greeting}</h2>
            <p>{new Date().toLocaleString()}</p>
            <div>
                <label htmlFor="coachSelect">Select your name: </label>
                <select
                    id="coachSelect"
                    value={currentCoachName}
                    onChange={e => setCurrentCoachName(e.target.value)}
                    style={{
                        padding: '10px',
                        margin: '20px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '50%',
                        fontSize: '16px',
                    }}
                >
                    <option value="">Select a Coach</option>
                    {coaches?.map(coach => (
                        <option key={coach.coachId} value={coach.name}>{coach.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => navigate('/view-schedule')} style={{
                padding: '10px 20px',
                margin: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                outline: 'none',
            }}>View Schedule</button>
            <button onClick={() => navigate('/add-availability')} style={{
                padding: '10px 20px',
                margin: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                outline: 'none',
            }}>Add Availability</button>
            <button onClick={() => navigate('/past-meetings')} style={{
                padding: '10px 20px',
                margin: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                outline: 'none',
            }}>View Past Meetings</button>
        </div>
    );
};

export default CoachHome;
