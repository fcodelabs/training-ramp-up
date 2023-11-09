import { useState } from "react";
import { Link } from "react-router-dom";

const SelfRegitrationPage = () => {
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
          <h1>Register</h1>
        </div>
        <form>
          <div>
            <label>Username</label>
          </div>
          <input value={email} onChange={handleEmailChange} />
          <div>
            <label>Email</label>
          </div>
          <input value={email} onChange={handleEmailChange} />
          <div>
            <label>Password</label>
          </div>
          <input value={password} onChange={handlePasswordChange} />
          <div>
            <button type="button" onClick={handleLogin}>
              <Link to="/login">Back</Link>
            </button>
            <button type="button" onClick={handleLogin}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelfRegitrationPage;
