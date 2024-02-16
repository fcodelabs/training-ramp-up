import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoadingSpinnerProps {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime && parseInt(expireTime) < Date.now()) {
      console.log("Session Expired");
      setLoggedIn(false);

      navigate("/login");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 1000 * 2; // 2 seconds
    localStorage.setItem("expireTime", expireTime.toString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime(); // Call updateExpireTime initially

    return () => {};
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return (
    <div className="loading-spinner">
      <span className="spinner"></span>
      <span className="message">Loading...</span>
      <br />
      {/* <span className="sub-message">You have to logged in....</span> */}
    </div>
  );
};

export default LoadingSpinner;
