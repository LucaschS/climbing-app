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
} from "../models/interface-models";
import CountriesList from "../components/CountriesList";
import CountriesNavigation from "../components/CountriesNavigation";
import GymMap from "../components/GymMap";

function GymsRootLayout() {
  const { countries } = useLoaderData() as CountriesDetailPageRouteData;
  const icon = "/climbing.png";

  return (
    <>
      <CountriesNavigation countries={countries} />
      <GymMap icon={icon} />
      <Outlet />
    </>
  );
}

export default GymsRootLayout;

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

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.countryId;
  console.log(id, "prams");
  return {
    countries: await loadCountries(),
    id: id,
  };
}
