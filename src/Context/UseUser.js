import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const locallyStoredData = localStorage.getItem('userData');
  useEffect(() => {
    // Retrieve the locally stored data from localStorage

    console.log(locallyStoredData)
    if (locallyStoredData) {
      // Parse the JSON string back into an object
      const userDataObject = JSON.parse(locallyStoredData);

      if (userDataObject ) {
        // Set the userData if customerId is not null
        setUserData(userDataObject);
        console.log(userDataObject)
      }
    }
  },[locallyStoredData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}