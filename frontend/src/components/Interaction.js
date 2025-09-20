import React, { useState, useRef } from "react";
import "../styles/Interaction.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Interaction = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [containerRef, containerVisible] = useScrollAnimation();

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion("");
    }
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      // Turn camera off
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraOn(false);
    } else {
      // Turn camera on
      try {
        console.log("Requesting camera access...");
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640, min: 320 },
            height: { ideal: 480, min: 240 },
            facingMode: "environment", // Use rear camera if available
          },
          audio: false,
        });
        console.log("Camera access granted", mediaStream);
        setStream(mediaStream);
        setCameraOn(true);

        // Set video source after state updates
        setTimeout(() => {
          if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current
              .play()
              .then(() => {
                console.log("Video started playing");
              })
              .catch((e) => {
                console.warn("Autoplay failed:", e);
                // Try to play manually
                videoRef.current.muted = true;
                videoRef.current.play().catch((err) => {
                  console.error("Manual play failed:", err);
                });
              });
          }
        }, 100);
      } catch (error) {
        console.error("Error accessing camera:", error);
        let errorMessage = "Unable to access camera. ";
        if (error.name === "NotAllowedError") {
          errorMessage += "Please allow camera permissions and try again.";
        } else if (error.name === "NotFoundError") {
          errorMessage += "No camera found on this device.";
        } else {
          errorMessage += "Please check your camera settings.";
        }
        alert(errorMessage);
      }
    }
  };

  return (
    <div
      id="camera-section"
      ref={containerRef}
      className={`interaction-container ${
        containerVisible ? "animate-in" : ""
      }`}
    >
      <div className="image-section">
        <div className="image-placeholder">
          {cameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              controls={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                backgroundColor: "#000",
                display: "block",
              }}
              onLoadedMetadata={(e) => {
                console.log(
                  "Video metadata loaded",
                  e.target.videoWidth,
                  e.target.videoHeight
                );
                if (videoRef.current) {
                  videoRef.current
                    .play()
                    .then(() =>
                      console.log("Video playing after metadata load")
                    )
                    .catch((e) =>
                      console.warn("Play failed after metadata:", e)
                    );
                }
              }}
              onCanPlay={(e) => {
                console.log("Video can play");
                e.target
                  .play()
                  .catch((err) =>
                    console.warn("CanPlay autoplay failed:", err)
                  );
              }}
              onLoadedData={() => {
                console.log("Video data loaded");
              }}
              onError={(e) => {
                console.error("Video error:", e, e.target.error);
              }}
            />
          ) : (
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="12" fill="#E0E0E0" />
              <path
                d="M50 32.5C43.1 32.5 37.5 38.1 37.5 45C37.5 51.9 43.1 57.5 50 57.5C56.9 57.5 62.5 51.9 62.5 45C62.5 38.1 56.9 32.5 50 32.5ZM50 52.5C45.86 52.5 42.5 49.14 42.5 45C42.5 40.86 45.86 37.5 50 37.5C54.14 37.5 57.5 40.86 57.5 45C57.5 49.14 54.14 52.5 50 52.5ZM50 62.5C40 62.5 32.425 67.575 30.425 75H69.575C67.575 67.575 60 62.5 50 62.5Z"
                fill="#BDBDBD"
              />
            </svg>
          )}
        </div>
        <button className="camera-toggle-btn" onClick={toggleCamera}>
          {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
      </div>
      <div className="ai-section">
        <div className="ai-chat">
          <div className="ai-header">Immersion AI:</div>
          <div className="ai-response">
            Take a photo to get instant environmental analysis and educational
            insights
          </div>
          <div className="questions-list">
            {questions.map((q, index) => (
              <div key={index} className="user-question">
                {q}
              </div>
            ))}
          </div>
          <div className="ask-questions">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Ask about the environment, climate, or natural phenomena..."
              onKeyPress={(e) => e.key === "Enter" && handleAddQuestion()}
            />
            <button onClick={handleAddQuestion}>Analyze Environment</button>
          </div>
        </div>
      </div>
      <div className="insights-section">
        <div className="insights-box">
          <div className="insights-header">Environmental Analysis:</div>
          <div className="insights-content">
            <div className="what-important">
              <strong>Current Conditions:</strong> Click "Turn Camera On" and
              capture your surroundings to get AI analysis
            </div>
            <div className="why-happening">
              <strong>Learn More:</strong> Upload or capture images for detailed
              environmental insights and educational content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interaction;
