import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../provider/authProvider";
// import { login } from "../../saga/apiService";

const LoginPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login }: any = useContext(AuthContext);

  const handleEmailChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // login(email, password)
    //   .then((data) => {
    //     console.log("Logged in:", data);
    //     window.location.href = "http://localhost:3000/";
    //   })
    //   .catch((error) => {
    //     console.error("Login error:", error);
    //   });
    let payload = {
      email: email,
      password: password,
    };
    await login(payload);
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
            <label>Email</label>
          </div>
          <input value={email} onChange={handleEmailChange} />
          <div>
            <label>Password</label>
          </div>
          <input value={password} onChange={handlePasswordChange} />
          <div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <button type="button">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
