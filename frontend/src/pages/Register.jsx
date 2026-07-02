import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post(
        "/api/users/register",
        { name,email,password }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message || "Failed to register"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Register</h1>

      {error && (
        <div style={{
          color: "#e74c3c",
          backgroundColor: "#fde8e7",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
          fontSize: "14px",
          textAlign: "center",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

      <p>
        Already User?
        <Link to="/">
          Login
        </Link>
      </p>

    </div>

  </div>
);
}

export default Register;