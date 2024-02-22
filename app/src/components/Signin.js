import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaUser, FaBookOpen } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Signin.css";
import axios from "axios";
// const LOGIN_URL = "/api/users/login";

const Signin = () => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const baseUrl = process.env.REACT_APP_BASEURL;
  const API_URL = `${baseUrl}/api/users/login`;
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const signInUser = async (formData) => {
      try {
        const response = await axios.post(API_URL, formData);
        console.log("response data: ", response);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/homepage");
        }
        const { _id, name, email, token } = response.data;
        setAuth({ _id, name, email, token });
        console.log("auth: ", auth.name);
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
    console.log("React formData: ", formData);
    signInUser(formData);
  };
  return (
    <>
      <section className="intro">
        <img
          src={require("../assets/readers-delight-high-resolution-logo.png")}
          alt="brand-logo"
        />
        <p>
          Welcome to Reader's Delight ! We look forward to having you{"   "}
          <FaBookOpen />
        </p>
      </section>
      <div className="signin">
        {error && (
          <p className="error-message">
            {error}
            {"  !!"}
          </p>
        )}{" "}
        <section className="signin-heading">
          <h1>
            <FaSignInAlt /> Signin
          </h1>
          <p>Signin to your account</p>
        </section>
        <section>
          <form onSubmit={onSubmit}>
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
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
            <p>
              Not registered?{" "}
              <Link to="/register">
                Sign Up <FaUser />
              </Link>
            </p>
          </form>
        </section>
      </div>
    </>
  );
};

export default Signin;
