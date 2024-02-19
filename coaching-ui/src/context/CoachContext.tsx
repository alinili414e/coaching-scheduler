// src/context/CoachesContext.tsx (Adjusted Example)
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCoaches } from '../services/coachServices';

interface CoachInfo {
    name: string;
    coachId: string;
    availability: Array<{
        date: string;
        timeSlots: string[];
    }>;
}

interface CoachesContextType {
    coaches: CoachInfo[] | null;
    selectedCoach: CoachInfo | null;
    setSelectedCoach: (coach: CoachInfo | null) => void;
}

const CoachesContext = createContext<CoachesContextType | undefined>(undefined);

export const CoachesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [coaches, setCoaches] = useState<CoachInfo[] | null>(null);
    const [selectedCoach, setSelectedCoach] = useState<CoachInfo | null>(null);

    useEffect(() => {
        const initializeCoaches = async () => {
            const fetchedCoaches = await fetchCoaches();
            setCoaches(fetchedCoaches);
        };

        initializeCoaches();
    }, []);

    return (
        <CoachesContext.Provider value={{ coaches, selectedCoach, setSelectedCoach }}>
            {children}
        </CoachesContext.Provider>
    );
};

export const useCoaches = () => {
    const context = useContext(CoachesContext);
    if (context === undefined) {
        throw new Error('useCoaches must be used within a CoachesProvider');
    }
    return context;
};
