import React from "react";
import { Github, Heart, Leaf, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Leaf className="logo-icon" />
              <span>Environmental Risk Assessment</span>
            </div>
            <p>
              Empowering communities with AI-powered environmental analysis to
              understand and mitigate drought and wildfire risks.
            </p>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  Open-Meteo Weather API
                </a>
              </li>
              <li>
                <a
                  href="https://power.larc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  NASA POWER Data
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  Google Gemini AI
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Educational Links</h4>
            <ul>
              <li>
                <a
                  href="https://www.nifc.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  National Interagency Fire Center
                </a>
              </li>
              <li>
                <a
                  href="https://www.drought.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  U.S. Drought Monitor
                </a>
              </li>
              <li>
                <a
                  href="https://www.epa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="link-icon" />
                  Environmental Protection Agency
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact & Support</h4>
            <div className="contact-info">
              <a
                href="mailto:support@envriskassessment.com"
                className="contact-link"
              >
                <Mail className="contact-icon" />
                support@envriskassessment.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Github className="contact-icon" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; 2024 Environmental Risk Assessment. Built with{" "}
              <Heart className="heart-icon" /> for environmental awareness.
            </p>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
