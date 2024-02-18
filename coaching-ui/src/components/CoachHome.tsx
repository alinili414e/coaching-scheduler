import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectedCoach } from '../context/SelectedCoachContext'; // Adjust import path as needed

const CoachHome = () => {
    const [currentCoach, setCurrentCoach] = useState<string>('');
    const [greeting, setGreeting] = useState<string>('');
    const navigate = useNavigate();
    const { setCoachInfo } = useSelectedCoach();

    const coaches = [
        { id: 1, name: 'Coach John' },
        { id: 2, name: 'Coach Jane' },
        { id: 3, name: 'Coach Mike' },
    ];

    useEffect(() => {
        const date = new Date();
        const hours = date.getHours();
        let greet: string = hours < 12 ? 'Good Morning' :
            hours >= 12 && hours <= 17 ? 'Good Afternoon' : 'Good Evening';

        if (currentCoach) {
            setGreeting(`${greet}, ${currentCoach}`);
            const selectedCoach = coaches.find(coach => coach.name === currentCoach);
            if (selectedCoach) {
                setCoachInfo(selectedCoach);
            }
        } else {
            setGreeting('Welcome to your dashboard!');
        }
    }, [currentCoach, setCoachInfo]);

    const buttonStyle: React.CSSProperties = {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        outline: 'none',
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    };

    const selectStyle: React.CSSProperties = {
        padding: '10px',
        margin: '20px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '50%',
        fontSize: '16px',
    };

    return (
        <div style={containerStyle}>
            <h2>{greeting}</h2>
            <p>{new Date().toLocaleString()}</p>
            <div>
                <label htmlFor="coachSelect">Select your name: </label>
                <select
                    id="coachSelect"
                    value={currentCoach}
                    onChange={e => setCurrentCoach(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">Select a Coach</option>
                    {coaches.map(coach => (
                        <option key={coach.id} value={coach.name}>{coach.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => navigate('/view-schedule')} style={buttonStyle}>View Schedule</button>
            <button onClick={() => navigate('/add-availability')} style={buttonStyle}>Add Availability</button>
            <button onClick={() => navigate('/past-meetings')} style={buttonStyle}>View Past Meetings</button>
        </div>
    );
};

export default CoachHome;
