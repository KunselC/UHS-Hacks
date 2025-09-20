import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  const scrollToCamera = () => {
    console.log("Scroll to camera clicked");
    const cameraSection = document.getElementById("camera-section");
    console.log("Camera section found:", cameraSection);
    if (cameraSection) {
      cameraSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      console.log("Scrolling to camera section");
    } else {
      console.error("Camera section not found!");
      // Fallback: scroll to bottom of page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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
        <button className="start-learning-btn" onClick={scrollToCamera}>
          START LEARNING
        </button>
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
          <div className="author-image">
            <img
              src="wagner.png"
              alt="Dr. Wagner"
              className="author-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
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
