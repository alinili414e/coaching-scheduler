
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import { CoachApp, StudentApp } from './components/HomeApp';


const App = () => {
  const [role, setRole] = useState<'student' | 'coach' | ''>('');

  return (
    <Router>
      {role === '' && <RoleSelection onRoleSelect={setRole} />}
      {role === 'coach' && <CoachApp />}
      {role === 'student' && <StudentApp />}
    </Router>
  );
};

export default App;
