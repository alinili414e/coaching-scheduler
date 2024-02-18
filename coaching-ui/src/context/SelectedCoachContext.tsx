// src/context/SelectedCoachContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoachInfo {
    id: number;
    name: string;
}

interface SelectedCoachContextType {
    coachInfo: CoachInfo | null;
    setCoachInfo: (info: CoachInfo | null) => void;
}

const SelectedCoachContext = createContext<SelectedCoachContextType | undefined>(undefined);

export const SelectedCoachProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [coachInfo, setCoachInfo] = useState<CoachInfo | null>(null);

    return (
        <SelectedCoachContext.Provider value={{ coachInfo, setCoachInfo }}>
            {children}
        </SelectedCoachContext.Provider>
    );
};

export const useSelectedCoach = () => {
    const context = useContext(SelectedCoachContext);
    if (context === undefined) {
        throw new Error('useSelectedCoach must be used within a SelectedCoachProvider');
    }
    return context;
};
