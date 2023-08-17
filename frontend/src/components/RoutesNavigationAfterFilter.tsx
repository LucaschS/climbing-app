import { NavLink } from "react-router-dom";
import { Route } from "../models/interface-models";

interface RouteCountryItemProps {
  filteredRoutes: Route[] | undefined;
}

function RoutesNavigationAfterFilter({
  filteredRoutes,
}: RouteCountryItemProps) {
  return (
    <header>
      <nav>
        <ul>
          {filteredRoutes &&
            filteredRoutes.map((filteredRoute) => (
              <li key={filteredRoute.id}>
                <NavLink
                  to={`/routes/${filteredRoute.country[0]}/${filteredRoute.id}`}
                >
                  {filteredRoute.tags.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default RoutesNavigationAfterFilter;
