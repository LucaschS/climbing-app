import React from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Styles from "./Navbar.module.css";

const MainNavigation = () => {
  const [searchParams] = useSearchParams();
  const isAuthOpen = searchParams.get("mode") === "auth";

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
            <Link to={`?mode=${isAuthOpen ? "" : "auth"}`}>
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
