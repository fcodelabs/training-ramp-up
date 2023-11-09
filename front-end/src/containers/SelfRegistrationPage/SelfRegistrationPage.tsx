import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../saga/apiService";

const SelfRegitrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    register(email, username, password)
      .then((data) => {
        console.log("Logged in:", data);
        window.location.href = "http://localhost:3000/login";
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        className="login-form"
        style={{ backgroundColor: "#fff8dc", padding: 40, borderRadius: 20 }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Register</h1>
        </div>
        <form>
          <div>
            <label>Username</label>
          </div>
          <input value={username} onChange={handleUsernameChange} />
          <div>
            <label>Email</label>
          </div>
          <input value={email} onChange={handleEmailChange} />
          <div>
            <label>Password</label>
          </div>
          <input value={password} onChange={handlePasswordChange} />
          <div>
            <button type="button">
              <Link to="/login">Back</Link>
            </button>
            <button type="button" onClick={handleRegister}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelfRegitrationPage;
