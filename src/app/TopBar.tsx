import React from "react";
import "./TopBar.css";

const TopBar: React.FC = () => {
  return (
    <div className="topBar">
      <div className="container">
        <div className="logo">MyApp</div>
        <div className="navLinks">
          <a href="/" className="navButton">Home</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
