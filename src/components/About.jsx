import React from "react";
import Card from "./Card";

function About() {
  return (
    <div className="about-section">
      <h1 className="text-4xl text-center m-4">About Us</h1>
      <p className="text-lg text-center m-4">
        Welcome to our team page! Get to know our amazing team members who make
        everything possible.
      </p>
      <div className="card-container">
        {/* Verify Card is displayed here */}
        <Card />
      </div>
    </div>
  );
}

export default About;
