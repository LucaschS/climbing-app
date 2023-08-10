import { NavLink } from "react-router-dom";
import { Route } from "../models/interface-models";

interface RouteCountryItemProps {
  countryRoutes: Route[];
}

function RoutesNavigation({ countryRoutes }: RouteCountryItemProps) {

  
  return (
    <header>
      <nav>
        <ul>
          {countryRoutes.map((countryRoute) => (
            <li key={countryRoute.id}>
              <NavLink
                to={`/routes/${countryRoute.country[0]}/${countryRoute.id}`}
              >
                {countryRoute.tags.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default RoutesNavigation;
