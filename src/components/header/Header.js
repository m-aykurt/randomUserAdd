import React from "react";
import logo from "../../assets/cw.svg";
import "./Header.css"

function Header() {
  return (
    <div className="header">
      <div className="image-div">
        <img className="logo" src={logo} alt="clarus-logo" />
      </div>
    </div>
  );
}

export default Header;
