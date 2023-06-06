import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";

import {
  CountriesDetailPageRouteData,
  GymsDetailPageRouteData,
} from "../models/interface-models";
import GymCountryItem from "../components/GymItem";
import GymsNavigation from "../components/GymsNavigation";

const CountryRootGymsDetailPage = () => {
  const { countryGyms } = useRouteLoaderData(
    "country-root-detail"
  ) as CountriesDetailPageRouteData;

  console.log(useRouteLoaderData("country-root-detail"), "i");
  return (
    <>
      <GymsNavigation countryGyms={countryGyms} />
      <Outlet />
    </>
  );
};

export default CountryRootGymsDetailPage;

async function loadCountryGyms(
  id: string | undefined
): Promise<GymsDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/gyms/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.countryGyms;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.countryId;
  // console.log(params, "id countries detail");
  return defer({
    countryGyms: await loadCountryGyms(id),
  });
}
