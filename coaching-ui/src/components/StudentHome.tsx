import React from 'react';
import { Link } from 'react-router-dom';

const StudentHome: React.FC = () => {
    return (
        <div>
            <h1>Welcome, Student!</h1>
            <p>Select an action below:</p>
            <ul>
                <li><Link to="/view-availability">View Available Coaching Slots</Link></li>
                <li><Link to="/booked-sessions">View Your Booked Sessions</Link></li>
                <li><Link to="/submit-feedback">Submit Feedback for a Session</Link></li>
            </ul>
        </div>
    );
};

export default StudentHome;
