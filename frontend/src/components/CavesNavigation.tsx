import { NavLink } from "react-router-dom";
import { Cave } from "../models/interface-models";

interface CaveCountryItemProps {
  countryCaves: Cave[];
}

function CavesNavigation({ countryCaves }: CaveCountryItemProps) {
  return (
    <header>
      <nav>
        <ul>
          {countryCaves.map((countryCave) => (
            <li key={countryCave.id}>
              <NavLink
                to={`/caves/${countryCave.country[0]}/${countryCave.id}`}
              >
                {countryCave.id}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default CavesNavigation;
