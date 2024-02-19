// src/components/CoachApp.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoachesProvider } from '../context/CoachContext';
import CoachHome from './CoachHome';
import { StudentProvider } from '../context/SelectedStudentContext';
import StudentHome from './StudentHome';
import AddAvailability from './AddAvailability';
// Import other coach-specific components

export const CoachApp = () => (
    <CoachesProvider>
        <Routes>
            <Route path="/" element={<CoachHome />} />
            <Route path="/add-availability" element={<AddAvailability />} />
        </Routes>
    </CoachesProvider>
);


export const StudentApp = () => (
    <StudentProvider>
        <Routes>
            <Route path="/" element={<StudentHome />} />
            {/* Define other student-specific routes */}
        </Routes>
    </StudentProvider>
);
