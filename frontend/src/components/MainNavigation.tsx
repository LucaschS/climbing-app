import React from "react";
import { Link, NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";

const MainNavigation = () => {
  return (
    <header className={Styles.header}>
      <nav>
        <ul className={Styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gyms">Gyms</Link>
          </li>
          <li>
            <Link to="/auth">Authentication</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
