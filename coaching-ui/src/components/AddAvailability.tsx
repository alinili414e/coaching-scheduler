
import React, { useState } from 'react';
import axios from 'axios';
import timeSlots from "../utils/constants";
import { useCoaches } from '../context/CoachContext';

interface Availability {
    date: string;
    startTime: string;
    endTime: string;
    coachId: string;
}

const AddAvailability: React.FC = () => {
    const [date, setDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const { selectedCoach } = useCoaches();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCoach) {
            alert('No coach selected.');
            return;
        }

        const [startTime, endTime] = selectedSlot.split('-');
        const availability: Availability = {
            date,
            startTime,
            endTime,
            coachId: selectedCoach.coachId,
        };

        try {
            // Update the endpoint URL and ensure the API key is included in your request headers as needed
            await axios.post('/api/availability', availability, {
                headers: {
                    // Assuming your API requires an x-api-key header; replace with actual key name if different
                    'x-api-key': process.env.REACT_APP_API_KEY || '',
                },
            });
            alert(`Availability added successfully for ${date} from ${startTime} to ${endTime}!`);
        } catch (error) {
            console.error('Failed to add availability:', error);
            alert('Failed to add availability.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        }}>
            <h2>{selectedCoach ? `Hello, ${selectedCoach.name}. Add your availability.` : 'Select a Coach'}</h2>
            <form onSubmit={handleSubmit} style={{
                padding: '20px',
                margin: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                backgroundColor: 'white',
            }}>
                <div>
                    <label htmlFor="date" style={{ margin: '10px 0 5px' }}>Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="timeSlot" style={{ margin: '10px 0 5px' }}>Time Slot:</label>
                    <select
                        id="timeSlot"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        <option value="">Select a Time Slot</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{
                    padding: '10px 20px',
                    margin: '20px 0',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                }}>Add Slot</button>
            </form>
        </div>
    );
};

export default AddAvailability;
