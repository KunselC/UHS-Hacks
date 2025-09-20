import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Thermometer,
  Droplets,
  Wind,
  Flame,
} from "lucide-react";

const Results = ({ data, loading }) => {
  if (loading) {
    return (
      <section className="results">
        <div className="container">
          <div className="loading-results">
            <div className="spinner"></div>
            <h3>Analyzing your data...</h3>
            <p>This may take a moment as we process environmental factors.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const getRiskColor = (score) => {
    if (score <= 25) return "low";
    if (score <= 50) return "moderate";
    if (score <= 75) return "high";
    return "extreme";
  };

  const getRiskIcon = (score) => {
    if (score <= 25) return <CheckCircle />;
    if (score <= 50) return <Info />;
    if (score <= 75) return <AlertTriangle />;
    return <Flame />;
  };

  const riskColor = getRiskColor(data.overall_risk_score);

  return (
    <section className="results">
      <div className="container">
        <h2>Assessment Results</h2>

        {/* Overall Risk Score */}
        <div className={`risk-summary ${riskColor}`}>
          <div className="risk-icon">
            {getRiskIcon(data.overall_risk_score)}
          </div>
          <div className="risk-content">
            <h3>Overall Risk Level: {data.risk_level}</h3>
            <div className="risk-score">
              <span className="score">{data.overall_risk_score}</span>
              <span className="score-label">/100</span>
            </div>
            <p>{data.recommendations?.overall || "Assessment complete"}</p>
          </div>
        </div>

        {/* Vegetation Analysis */}
        {data.vegetation_analysis && (
          <div className="analysis-section">
            <h3>Vegetation Health Analysis</h3>
            <div className="analysis-grid">
              <div className="analysis-item">
                <h4>Health Status</h4>
                <p
                  className={`status ${data.vegetation_analysis.health_status?.toLowerCase()}`}
                >
                  {data.vegetation_analysis.health_status}
                </p>
              </div>
              <div className="analysis-item">
                <h4>Confidence</h4>
                <p>{data.vegetation_analysis.confidence}%</p>
              </div>
              <div className="analysis-item">
                <h4>Species Detected</h4>
                <p>{data.vegetation_analysis.species || "Not identified"}</p>
              </div>
            </div>
            {data.vegetation_analysis.description && (
              <p className="analysis-description">
                {data.vegetation_analysis.description}
              </p>
            )}
          </div>
        )}

        {/* Environmental Factors */}
        {data.environmental_data && (
          <div className="analysis-section">
            <h3>Environmental Conditions</h3>
            <div className="environmental-grid">
              {data.environmental_data.temperature !== undefined && (
                <div className="env-item">
                  <Thermometer className="env-icon" />
                  <div>
                    <h4>Temperature</h4>
                    <p>{data.environmental_data.temperature}°C</p>
                  </div>
                </div>
              )}
              {data.environmental_data.humidity !== undefined && (
                <div className="env-item">
                  <Droplets className="env-icon" />
                  <div>
                    <h4>Humidity</h4>
                    <p>{data.environmental_data.humidity}%</p>
                  </div>
                </div>
              )}
              {data.environmental_data.wind_speed !== undefined && (
                <div className="env-item">
                  <Wind className="env-icon" />
                  <div>
                    <h4>Wind Speed</h4>
                    <p>{data.environmental_data.wind_speed} km/h</p>
                  </div>
                </div>
              )}
              {data.environmental_data.precipitation !== undefined && (
                <div className="env-item">
                  <Droplets className="env-icon rain" />
                  <div>
                    <h4>Precipitation</h4>
                    <p>{data.environmental_data.precipitation} mm</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Risk Breakdown */}
        {data.risk_breakdown && (
          <div className="analysis-section">
            <h3>Risk Factor Breakdown</h3>
            <div className="risk-breakdown">
              {Object.entries(data.risk_breakdown).map(([factor, score]) => (
                <div key={factor} className="risk-factor">
                  <div className="factor-name">{factor.replace(/_/g, " ")}</div>
                  <div className="factor-score">
                    <div
                      className="score-bar"
                      style={{ width: `${score}%` }}
                    ></div>
                    <span className="score-text">{score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations && (
          <div className="analysis-section">
            <h3>Recommendations</h3>
            <div className="recommendations">
              {data.recommendations.specific && (
                <div className="rec-section">
                  <h4>Immediate Actions</h4>
                  <ul>
                    {Array.isArray(data.recommendations.specific) ? (
                      data.recommendations.specific.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))
                    ) : (
                      <li>{data.recommendations.specific}</li>
                    )}
                  </ul>
                </div>
              )}
              {data.recommendations.preventive && (
                <div className="rec-section">
                  <h4>Preventive Measures</h4>
                  <ul>
                    {Array.isArray(data.recommendations.preventive) ? (
                      data.recommendations.preventive.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))
                    ) : (
                      <li>{data.recommendations.preventive}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="educational-content">
          <h3>Learn More About Environmental Risk</h3>
          <div className="education-grid">
            <div className="education-item">
              <h4>Drought Indicators</h4>
              <p>
                Vegetation stress, soil moisture levels, and precipitation
                patterns are key indicators of drought conditions.
              </p>
            </div>
            <div className="education-item">
              <h4>Fire Risk Factors</h4>
              <p>
                Low humidity, high temperatures, and dry vegetation
                significantly increase wildfire risk.
              </p>
            </div>
            <div className="education-item">
              <h4>Preventive Actions</h4>
              <p>
                Regular monitoring, proper land management, and community
                preparedness can reduce environmental risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
