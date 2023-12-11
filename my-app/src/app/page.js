"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
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
            <Link href="/viewMatches">
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
      {/* <main>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 match-image"
                        src="https://egyptianstreets.com/wp-content/uploads/2017/01/2011244-42220367-2560-1440.jpg"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 match-image"
                        src="https://english.ahram.org.eg/Media/News/2023/9/18/41_2023-638306579125578465-557.jpg"
                    />
                </Carousel.Item>
            </Carousel>
        </main> */}
    </div>
  );
}
