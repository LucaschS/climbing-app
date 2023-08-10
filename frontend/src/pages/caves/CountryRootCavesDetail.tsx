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
  CavesDetailPageRouteData,
} from "../../models/interface-models";
import GymCountryItem from "../../components/GymItem";
import MapComponent from "../../components/MapComponent";
import CavesNavigation from "../../components/CavesNavigation";

const CountryRootCavesDetailPage = () => {
  const { countryCaves } = useRouteLoaderData(
    "country-root-caves-detail"
  ) as CountriesDetailPageRouteData;

  const icon = "/caves.png";

  return (
    <>
      <CavesNavigation countryCaves={countryCaves} />
      <MapComponent icon={icon} mapItems={countryCaves} />
      <Outlet />
    </>
  );
};

export default CountryRootCavesDetailPage;

async function loadCountryCaves(
  id: string | undefined
): Promise<CavesDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/caves/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.countryCaves;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.countryId;

  return {
    countryCaves: await loadCountryCaves(id),
  };
}
