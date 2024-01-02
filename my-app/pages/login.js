"use client";
import React, { useState } from "react";
import "../styles/onBoarding.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "../components/customButton";
import { Modal } from "react-bootstrap";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const router = useRouter();

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    city: "",
    address: "",
    emailAddress: "",
    role: "",
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    console.log("EL LOGIN AHWWW B2A  AHEHHHHHH");


    try {
      const data = {
        userName: loginData.userName,
        password: loginData.password,
      };
      console.log("DATAAAA");
      console.log(data);
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("EL JSONNNN AHW");
      console.log(JSON.stringify(data));
      console.log("EL ressss AHW");
      console.log(res.status);
      if (!res.ok) throw new Error(res.statusText);
      

      const result = await res.json();
      console.log("EL MESSAGE LEL LOGIN AHEHHHHHH");
      console.log(result);

      if (result.message === "Login Successful") {
        if (typeof window !== "undefined") {
          localStorage.setItem("role", result.result.role);
          localStorage.setItem("token", result.accessToken);
          router.push("/viewMatches");
        }
        router.push("/viewMatches");
      } else if (result.message === "Your SignUp Request Hasn't Been Reviewed Yet") {
        console.log("ana msh reviewed");
        setLoginError("Your SignUp Request Hasn't Been Reviewed Yet");
      } else if (result.message === "Your SignUp Request Has Been Declined") {
        console.log("ana declined");
        setLoginError("Your SignUp Request Has Been Declined");
      } else {
        setLoginError("Login Failed");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      setLoginError("Login Failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpError("");
    if (
      !formData.userName.trim() ||
      !formData.password.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.birthDate.trim() ||
      !formData.gender ||
      !formData.city.trim() ||
      !formData.address.trim() ||
      !formData.emailAddress.trim() ||
      !formData.role
    ) {
      setSignUpError("Please complete all fields");
      return; // Stop the submission
    }

    try {
      const res = await fetch("http://localhost:8080/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (!res.ok) throw new Error(res.statusText);
      const result = await res.json();
      console.log(result);
      if (result.message === "User Already Exists") {
        setSignUpError("User Already Exists");
      } else if (result.message === "User added successfully") {
        console.log("harohh view matches");
        router.push("/viewMatches");
      } else {
        setSignUpError("Failed to Sign Up");
      }
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const loginForm = () => {
    setIsLogin(true);
  };
  const signUpForm = () => {
    setIsLogin(false);
  };
  return (
    <div className="page-container">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="button-container">
                  <Link href="/">
                    <CustomButton>Home</CustomButton>
                  </Link>
                  <Link href="/viewMatches">
                    <button type="button" className="btn btn-primary">
                      View Matches
                    </button>
                  </Link>
                </div>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <div className="toggle-container">
                  <span className="toggle-label-text" onClick={loginForm}>
                    Login
                  </span>
                  <label
                    htmlFor="reg-log"
                    className="toggle-label"
                    onClick={toggleForm}
                  >
                    <FontAwesomeIcon
                      icon={isLogin ? faArrowLeft : faArrowRight} // Toggle between icons
                      className="toggle-icon"
                    />
                  </label>
                  <span className="toggle-label-text" onClick={signUpForm}>
                    Sign Up
                  </span>
                </div>

                <div
                  className={`card-3d-wrap mx-auto ${isLogin ? "" : "flipped"}`}
                >
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <form onSubmit={handleLogin}>
                        <div className="center-wrap">
                          <div className="section text-center">
                            {loginError && (
                              <p style={{ color: "red", textAlign: "center" }}>
                                {loginError}
                              </p>
                            )}
                            <h4 className="mb-4 pb-3">Log In</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="userName"
                                value={loginData.userName}
                                onChange={handleLoginChange}
                                className="form-style"
                                placeholder="Your Username"
                                id="logUserName"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="form-style"
                                placeholder="Your Password"
                                id="logPassword"
                                autoComplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Log In
                            </button>

                            <p className="mb-0 mt-4 text-center">
                              <a
                                className="link"
                                onClick={() => router.push("/forgotPassword")}
                                style={{ cursor: "pointer" }}
                              >
                                Forgot your password?
                              </a>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          {signUpError && (
                            <p style={{ color: "red", textAlign: "center" }}>
                              {signUpError}
                            </p>
                          )}
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <form onSubmit={handleSubmit}>
                            <div className="form-row">
                              <div className="form-column">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Username"
                                    id="signName"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-user"></i>
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="First Name"
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Last Name"
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Birth Date"
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="form-group">
                                  <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="form-style gender"
                                    defaultValue=""
                                  >
                                    <option value="" disabled>
                                      Role
                                    </option>
                                    <option value="Fan">Fan</option>
                                    <option value="Manager">Manager</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-column">
                                <div className="form-group">
                                  <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="form-style gender"
                                    defaultValue=""
                                  >
                                    <option value="" disabled>
                                      Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </div>

                                <div className="form-group mt-2">
                                  <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Your Email"
                                    id="emailAddress"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Your Password"
                                    id="signPass"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="City"
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="form-style"
                                    placeholder="Address"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Submit
                            </button>
                          </form>{" "}
                          {/* End of Form */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
