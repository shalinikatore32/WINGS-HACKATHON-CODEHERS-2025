import React, { createContext, useContext, useEffect, useState } from "react";


const EventContext = createContext();


const EventProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState({});

  const authorizedToken = token;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    setRegistrationStatus({});
  };

  const authenticateUser = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/user`, {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const fetchRegistrationStatus = async (eventId) => {
    if (!token) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/registration-status`,
        {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRegistrationStatus((prevStatus) => ({
          ...prevStatus,
          [eventId]: data.isRegistered,
        }));
      }
    } catch (error) {
      console.error("Error fetching registration status:", error);
    }
  };

  useEffect(() => {
    authenticateUser();
  
  }, [token]);

  useEffect(() => {
    if (isLoggedIn && events.length > 0) {
      events.forEach((event) => fetchRegistrationStatus(event._id));
    }
  }, [isLoggedIn, events]);

  return (
    <EventContext.Provider
      value={{
        isLoggedIn,
        storeToken,
        LogoutUser,
        user,
        events,
        authorizedToken,
        isLoading,
        registrationStatus,
        fetchRegistrationStatus,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};


const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export { EventProvider, useEventContext };
