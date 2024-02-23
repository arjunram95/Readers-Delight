import React, { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaBookOpen } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Register.css";
const Register = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const baseUrl = process.env.REACT_APP_BASEURL;
  const API_URL = `${baseUrl}/api/users/`;
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const registerUser = async (formData) => {
      try {
        const response = await axios.post(API_URL, formData);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/homepage");
        }
        const { _id, name, email, token } = response.data;
        setAuth({ _id, name, email, token });
        console.log("response data: ", response.data);
        console.log("localstorage: ", localStorage.getItem("user"));
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          // Server responded with an error status (4xx)
          setError(error.response.data.message);
        } else {
          // Other types of errors (axios errors, network errors, etc.)
          setError("An error occurred. Please try again later.");
        }
        console.log(error); // Log the error for debugging
      }
    };
    console.log(formData);
    registerUser(formData);
  };
  return (
    <>
      <section className="intro">
        <img
          src="/assets/readers-delight-high-resolution-logo.png"
          alt="brand-logo"
        />
        <p>
          Welcome to Reader's Delight ! Join our book community <FaBookOpen />
        </p>
      </section>
      <div className="register">
        {error && (
          <p className="error-message">
            {error}
            {"  !!"}
          </p>
        )}{" "}
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>
        <section>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>

            <p>
              Already have an account?{" "}
              <Link to="/signin">
                Sign In <FaSignInAlt />
              </Link>
            </p>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
