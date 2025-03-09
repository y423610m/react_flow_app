import React from "react";
import "./TopBar.css";

const TopBar: React.FC = () => {
  return (
    <div className="topBar">
      <div className="container">
        <div className="logo">MyApp</div>
        <div className="navLinks">
          <a href="/" className="navButton">Home</a>
          <a href="/teaching-control" className="navButton">TeachingControl</a>
          <a href="/" className="navButton">TODO</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
