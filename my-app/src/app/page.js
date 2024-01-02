"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Carousel } from "react-bootstrap";
import "../../styles/frontPage.css";
import CustomButton from "../../components/customButton";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Egyptian Premier League</h1>
        <div className="header-buttons">
          <div className="button-container">
            <Link href="/login">
              <CustomButton>Login</CustomButton>
            </Link>
          </div>
          <div className="button-container">
            <Link href="/viewMatchesGuest">
              <CustomButton>View Matches</CustomButton>
            </Link>
          </div>
          <div className="button-container">
            <Link href="/pastMatches">
              <CustomButton>View Past Matches</CustomButton>
            </Link>
          </div>
        </div>
      </header>
      <Carousel className="carousel-container">
        <Carousel.Item>
          <img
            className="d-block w-100 match-image"
            src="https://africa.cgtn.com/wp-content/uploads/2023/06/Al-Ahly-team-photo-before-CAF-CL-quarterfinal-v-Mamelodi-Sundowns.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 match-image"
            src="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2021/08/18/2768866-940610078.jpg?itok=JNO6oq8c"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
