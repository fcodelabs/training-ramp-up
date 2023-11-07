import { alignProperty } from "@mui/material/styles/cssUtils";
import { useState } from "react";

const LoginPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log("Logging in with email:", email, "and password:", password);
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
          <h1>Login</h1>
        </div>
        <form>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            {" "}
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <button type="button" onClick={handleLogin}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
