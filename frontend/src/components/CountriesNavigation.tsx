import { Link, useRouteLoaderData } from "react-router-dom";
import {
  CountriesDetailPageRouteData,
  Country,
} from "../models/interface-models";

interface CountryListProps {
  countries: Country[];
}

interface Accumulator {
  [key: string]: {
    group: string;
    children: Country[];
  };
}

function CountriesNavigation({ countries }: CountryListProps) {
  const sortedCountries = countries.sort((a, b) => (a.name > b.name ? 1 : -1));

  let groupCountries = sortedCountries.reduce(
    (accumulator: Accumulator, value) => {
      // get first letter of name of current element
      let group = value.name[0];

      // console.log(group, "group");
      // if there is no property in accumulator with this letter create it
      if (!accumulator[group])
        accumulator[group] = { group, children: [value] };
      // if there is push current element to children array for that letter
      else accumulator[group].children.push(value);
      // return accumulator
      // console.log(accumulator, "accumulator");

      return accumulator;
    },
    {}
  );

  // since data at this point is an object, to get array of values
  // we use Object.values method

  let result = Object.values(groupCountries);
  let dupa = Object.keys(groupCountries);
  // console.log(result);
  // console.log(dupa, "dupa");

  return (
    <header>
      <nav>
        <ul>
          {result &&
            result.map((x) => (
              <li>
                <h1>{x.group}</h1>
                <ul>
                  {x.children.map((y) => (
                    <li>
                      <Link to={y["alpha-3"].toLocaleLowerCase()}>
                        {y.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default CountriesNavigation;
