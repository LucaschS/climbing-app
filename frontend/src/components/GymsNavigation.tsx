import { NavLink } from "react-router-dom";

function GymsNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/gyms">Gyms</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default GymsNavigation;
