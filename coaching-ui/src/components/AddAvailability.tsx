import React, { CSSProperties, useState } from 'react';
import axios from 'axios';
import timeSlots from "../utils/constants";
import { useSelectedCoach } from '../context/SelectedCoachContext';

interface Availability {
    date: string;
    startTime: string;
    endTime: string;
}

const AddAvailability: React.FC = () => {
    const [date, setDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const { coachInfo } = useSelectedCoach(); // Accessing the selected coach's information

    // Styles remain unchanged
    const containerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column', // Adjusted for vertical alignment
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    };

    const formStyle: CSSProperties = {
        padding: '20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        backgroundColor: 'white',
    };

    const inputStyle: React.CSSProperties = {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '20px 0',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    };

    const labelStyle = {
        margin: '10px 0 5px',
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [startTime, endTime] = selectedSlot.split('-');
        const availability: Availability = { date, startTime, endTime };

        try {
            await axios.post('/api/availability', availability);
            alert(`Availability added successfully for ${date} from ${startTime} to ${endTime}!`);
        } catch (error) {
            console.error('Failed to add availability:', error);
            alert('Failed to add availability.');
        }
    };

    return (
        <div style={containerStyle}>
            {/* Welcome message using coach's name from context */}
            <h2>{coachInfo ? `Hello, ${coachInfo.name}. Choose your availability.` : 'Welcome!'}</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label htmlFor="date" style={labelStyle}>Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="timeSlot" style={labelStyle}>Time Slot:</label>
                    <select
                        id="timeSlot"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        required
                        style={inputStyle}
                    >
                        <option value="">Select a Time Slot</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={buttonStyle}>Add Slot</button>
            </form>
        </div>
    );
};

export default AddAvailability;
