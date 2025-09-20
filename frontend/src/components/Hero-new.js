import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-main">
        <h4>Hands-on Learning</h4>
        <h1>REIMAGINED</h1>
        <p>
          Experiential Learning is Real Learning.
          <br />
          Do it better with Immersion.
        </p>
        <button className="start-learning-btn">START LEARNING</button>
      </div>

      <div className="hero-details">
        <div className="what-is-immersion">
          <h2>What is Immersion?</h2>
          <p>
            Immersion is the AI and machine learning-powered learning experience
            supporting students and teachers of all grade levels in reimagining
            what learning should be.
          </p>
        </div>
        <div className="why-use-immersion">
          <h2>Why should I use Immersion?</h2>
          <ul>
            <li>
              Up to <strong>91%</strong> lower failure rate
            </li>
            <li>
              Up to <strong>73.6%</strong> more students earning A's and B's
            </li>
            <li>
              <strong>33%</strong> reduction in achievement gap for
              underrepresented students
            </li>
          </ul>
          <p className="small-text">
            Numbers comparing experimental and traditional classroom learning
          </p>
        </div>
      </div>

      <div className="hero-quote">
        <div className="quote-content">
          <h3>Experimental learning is for</h3>
          <h2>EVERYONE</h2>
          <p>
            "An overarching goal of education should be to immerse students in
            the beauty and inspiration of their surrounding world"
          </p>
        </div>
        <div className="quote-author">
          <div className="author-image-placeholder">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#E0E0E0" />
              <path
                d="M20 13C17.24 13 15 15.24 15 18C15 20.76 17.24 23 20 23C22.76 23 25 20.76 25 18C25 15.24 22.76 13 20 13ZM20 21C18.34 21 17 19.66 17 18C17 16.34 18.34 15 20 15C21.66 15 23 16.34 23 18C23 19.66 21.66 21 20 21ZM20 25C16 25 12.97 27.03 12.17 30H27.83C27.03 27.03 24 25 20 25Z"
                fill="#BDBDBD"
              />
            </svg>
          </div>
          <p>
            <strong>Tony Wagner,</strong>
            <br />
            Expert in Residence at Harvard's Innovation Lab
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
