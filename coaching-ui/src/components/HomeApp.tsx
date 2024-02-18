// src/components/CoachApp.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SelectedCoachProvider } from '../context/SelectedCoachContext';
import CoachHome from './CoachHome';
import { StudentProvider } from '../context/SelectedStudentContext';
import StudentHome from './StudentHome';
import AddAvailability from './AddAvailability';
// Import other coach-specific components

export const CoachApp = () => (
    <SelectedCoachProvider>
        <Routes>
            <Route path="/" element={<CoachHome />} />
            <Route path="/add-availability" element={<AddAvailability />} />
        </Routes>
    </SelectedCoachProvider>
);


export const StudentApp = () => (
    <StudentProvider>
        <Routes>
            <Route path="/" element={<StudentHome />} />
            {/* Define other student-specific routes */}
        </Routes>
    </StudentProvider>
);
