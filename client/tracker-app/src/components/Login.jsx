import { useState, useContext } from "react";
import API from "../services/api.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted:", email, password); // check
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("Login success:", res.data);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
    // const res = await API.post("/auth/login", { email, password });
    // login(res.data);
    // navigate("/dashboard");
  };

  return (
    <div className="flex flex-col p-6 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mb-2 w-full"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
