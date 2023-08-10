import {
  useRouteLoaderData,
  json,
  defer,
  useLoaderData,
  Await,
  Outlet,
  useLocation,
  LoaderFunctionArgs,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  CountriesDetailPageRouteData,
  Country,
  RoutesDetailPageRouteData,
} from "../../models/interface-models";
import CountriesList from "../../components/CountriesList";
import CountriesNavigation from "../../components/CountriesNavigation";
import MapComponent from "../../components/MapComponent";
import Finder from "../../components/RouteFinder";
import { Route } from "../../models/interface-models";

function RoutesRootLayout() {
  const { routes, countries } = useLoaderData() as CountriesDetailPageRouteData;
  const icon = "/climbing.png";

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  let countriesAbbr: string[] = [];

  routes.forEach((abbr) => {
    if (!countriesAbbr.includes(abbr.country[0])) {
      countriesAbbr.push(abbr.country[0]);
    }
  });

  useEffect(() => {
    countriesAbbr.map((x) => {
      let y = countries.filter((y) => x.includes(y["alpha-3"]));
      setFilteredCountries((prevState) => [...prevState, ...y]);
    });
  }, []);


  return (
    <>
      <Finder  />
      <CountriesNavigation countries={filteredCountries} />
      <MapComponent icon={icon} mapItems={routes} />
      <Outlet />
    </>
  );
}

export default RoutesRootLayout;

//wymyślić coś innego
async function loadCountries(): Promise<CountriesDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/countries");
  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch countries",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.countries;
  }
}

async function loadRoutes(): Promise<RoutesDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/routes/");
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.routes;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  return {
    countries: await loadCountries(),
    routes: await loadRoutes(),
  };
}
