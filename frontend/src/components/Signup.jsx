import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // this is an user details obj
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // here the values will be stored
  const handleChange = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // here we are handling the signup when the user click on the signup button
  const handleSignup = async () => {
    try {
      if (
        !userDetails.username ||
        !userDetails.email ||
        !userDetails.password
      ) {
        setError("please fill all the fields");
        return;
      }
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

      userDetails.username("");
      userDetails.email("");
      userDetails.password("");
      console.log(userDetails);
    } catch (error) {
      // setError(error);
      // console.log(error);
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div className="py-5">
      <h1 className="text-center text-3xl">Signup</h1>
      <div className="flex flex-col px-5 py-2 space-y-4">
        <input
          type="text"
          placeholder="Enter Username"
          className="p-2 outline-none border border-gray-300 rounded"
          name="username"
          onChange={(e) => handleChange(e)}
          value={userDetails.username}
          required
        />
        <input
          type="text"
          placeholder="Enter email"
          className="p-2 outline-none border border-gray-300 rounded"
          name="email"
          onChange={(e) => handleChange(e)}
          value={userDetails.email}
          required
        />
        <input
          type="password"
          placeholder="********"
          className="p-2 outline-none border border-gray-300 rounded"
          name="password"
          onChange={(e) => handleChange(e)}
          value={userDetails.password}
          required
        />

        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 p-2 rounded" onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </motion.div>
  );
};

export default Signup;
