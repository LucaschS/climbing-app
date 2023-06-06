import { Link, useRouteLoaderData } from "react-router-dom";
import {
  CountriesDetailPageRouteData,
  Country,
} from "../models/interface-models";

interface CountryListProps {
  countries: Country[];
}

function CountriesNavigation({ countries }: CountryListProps) {
  // console.log(countries, "navcountriid");
  return (
    <header>
      <nav>
        <ul>
          {countries &&
            countries.map((country) => (
              <li key={country["alpha-3"]}>
                <Link to={`${country["alpha-3"].toLocaleLowerCase()}`}>
                  {country.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default CountriesNavigation;
