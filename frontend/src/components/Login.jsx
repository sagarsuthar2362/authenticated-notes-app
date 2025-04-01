import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      //saving the token in the localstorage
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4">
          Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">create an account</Link>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
