// src/context/StudentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type StudentContextType = {
    currentStudent: string;
    setCurrentStudent: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContextValue: StudentContextType = {
    currentStudent: '',
    setCurrentStudent: () => { },
};

const StudentContext = createContext<StudentContextType>(defaultContextValue);

export const useStudent = () => useContext(StudentContext);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentStudent, setCurrentStudent] = useState<string>('');

    return (
        <StudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
