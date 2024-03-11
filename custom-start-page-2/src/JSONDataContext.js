import React, { createContext, useState } from 'react';

const JSONDataContext = createContext();

/**
 * JSONDataProvider function to provide JSON data to the children components.
 *
 * @param {Object} children - The children components to be provided with JSON data.
 * @return {JSX.Element} The JSX element containing the JSONDataContext.Provider and children components.
 */

// ok this is a json data provider
// it is a json data provider
// it is a json data provider
// it essentially encapsulates every compontent, and they can call jsonData or setJSONData to get or set the json data
// it makes it much more simple this way i know you are impressed

export const JSONDataProvider = ({ children }) => {
  const [jsonData, setJSONData] = useState({});

  return (
    <JSONDataContext.Provider value={{ jsonData, setJSONData }}>
      {children}
    </JSONDataContext.Provider>
  );
};

export const useJSONData = () => React.useContext(JSONDataContext);
