import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext.jsx';
import { auth, onAuthStateChanged } from '../../firebase.js';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};