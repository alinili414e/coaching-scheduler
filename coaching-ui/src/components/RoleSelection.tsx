import React from 'react';

interface RoleSelectionProps {
    onRoleSelect: (role: 'student' | 'coach') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
    };

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

    const headingStyle: React.CSSProperties = {
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Welcome to the Coaching Scheduler</h2>
            <p>Please select your role:</p>
            <button onClick={() => onRoleSelect('student')} style={buttonStyle}>Student</button>
            <button onClick={() => onRoleSelect('coach')} style={buttonStyle}>Coach</button>
        </div>
    );
};

export default RoleSelection;
