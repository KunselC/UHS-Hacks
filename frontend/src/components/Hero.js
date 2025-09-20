import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  const scrollToCamera = () => {
    console.log("Scroll to camera clicked");
    const cameraSection = document.getElementById("plant-camera-section");
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
        <h4>Plant Health & Agricultural Sciences</h4>
        <h1>REIMAGINED</h1>
        <p>
          Experiential Learning in Agriculture is Real Learning.
          <br />
          Master plant health diagnostics with AI-powered Immersion.
        </p>
        <button className="start-learning-btn" onClick={scrollToCamera}>
          START PLANT DIAGNOSIS
        </button>
      </div>

      <div className="hero-details">
        <div className="what-is-immersion">
          <h2>What is Agricultural Immersion?</h2>
          <p>
            Immersion is the AI and machine learning-powered agricultural
            learning platform supporting students and teachers in mastering
            plant health diagnosis, crop management, and sustainable farming
            practices through hands-on experience.
          </p>
        </div>
        <div className="why-use-immersion">
          <h2>Why use Immersion for Plant Health?</h2>
          <ul>
            <li>
              Up to <strong>91%</strong> improvement in plant disease
              identification
            </li>
            <li>
              Up to <strong>73.6%</strong> better crop yield predictions
            </li>
            <li>
              <strong>33%</strong> reduction in agricultural knowledge gaps
            </li>
          </ul>
          <p className="small-text">
            Numbers comparing AI-assisted vs traditional agricultural education
          </p>
        </div>
      </div>

      <div className="hero-quote">
        <div className="quote-content">
          <h3>Agricultural education through</h3>
          <h2>REAL PLANT ANALYSIS</h2>
          <p>
            "The future of agriculture depends on students understanding plant
            health through direct observation, AI analysis, and hands-on
            experimentation"
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
            Expert in Agricultural Innovation at Harvard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
