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
  GymsDetailPageRouteData,
} from "../../models/interface-models";
import CountriesList from "../../components/CountriesList";
import CountriesNavigation from "../../components/CountriesNavigation";
import MapComponent from "../../components/MapComponent";
import Finder from "../../components/RouteFinder";

function GymsRootLayout() {
  const { gyms, countries } = useLoaderData() as CountriesDetailPageRouteData;
  const icon = "/climbing.png";

  const [searchResults, setSearchResults] = useState<string | number>("");

  console.log(searchResults, "filter");

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  // const [countriesAbbreviation, setCountriesAbbreviation] = useState<string>([]);

  let countriesAbbr: string[] = [];

  console.log(countriesAbbr, "countriesAbbr");

  gyms.forEach((abbr) => {
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
      <CountriesNavigation countries={filteredCountries} />
      <MapComponent icon={icon} mapItems={gyms} />
      <Outlet />
    </>
  );
}

export default GymsRootLayout;

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

async function loadGyms(): Promise<GymsDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/gyms/");
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.gyms;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  return {
    countries: await loadCountries(),
    gyms: await loadGyms(),
  };
}
