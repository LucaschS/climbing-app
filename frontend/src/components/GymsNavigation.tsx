import { NavLink } from "react-router-dom";
import { Gym } from "../models/interface-models";

interface GymCountryItemProps {
  countryGyms: Gym[];
}

function GymsNavigation({ countryGyms }: GymCountryItemProps) {
  return (
    <header>
      <nav>
        <ul>
          {countryGyms.map((countryGym) => (
            <li key={countryGym.id}>
              <NavLink to={`/gyms/${countryGym.cities[0]}/${countryGym.id}`}>
                {countryGym.tags.name} - {countryGym.tags.leisure}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default GymsNavigation;
