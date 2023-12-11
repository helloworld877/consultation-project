"use client";
import React, { useState } from "react";
import "../styles/onBoarding.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle the state
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
                  <Link href="/viewMatches">
                    {/* <a className="view-matches-btn">View Matches</a>{" "} */}
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
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a href="#" className="btn mt-4">
                            submit
                          </a>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-row">
                            <div className="form-column">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="username"
                                  className="form-style"
                                  placeholder="Username"
                                  id="logname"
                                  autoComplete="off"
                                />
                                <i className="input-icon uil uil-user"></i>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="firstName"
                                  className="form-style"
                                  placeholder="First Name"
                                  autoComplete="off"
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="lastName"
                                  className="form-style"
                                  placeholder="Last Name"
                                  autoComplete="off"
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="date"
                                  name="birthDate"
                                  className="form-style"
                                  placeholder="Birth Date"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="form-column">
                              <div className="form-group">
                                <select
                                  name="gender"
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
                                  name="logemail"
                                  className="form-style"
                                  placeholder="Your Email"
                                  id="logemail"
                                  autoComplete="off"
                                />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="password"
                                  name="logpass"
                                  className="form-style"
                                  placeholder="Your Password"
                                  id="logpass"
                                  autoComplete="off"
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="address"
                                  className="form-style"
                                  placeholder="Address"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                          <a href="#" className="btn mt-4">
                            submit
                          </a>
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
