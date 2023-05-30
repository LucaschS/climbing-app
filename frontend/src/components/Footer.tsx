import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <nav>
        <ul className={Styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/route-list">Route List</Link>
          </li>
          <li>
            <Link to="/cave-list">Cave List</Link>
          </li>
          <li>
            <Link to="/gyms">Gyms</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
        </ul>
      </nav>
      <div className={Styles.copyright}></div>
    </footer>
  );
};

export default Footer;
