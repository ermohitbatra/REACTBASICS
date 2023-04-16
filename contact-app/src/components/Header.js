import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui item menu">
      <div>
        <Link to="/">
          <h2>Contact Manager</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
