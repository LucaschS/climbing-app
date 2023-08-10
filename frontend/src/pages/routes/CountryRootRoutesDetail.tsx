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
  RoutesDetailPageRouteData,
} from "../../models/interface-models";
import GymCountryItem from "../../components/RouteItem";
import RoutesNavigation from "../../components/RoutesNavigation";
import MapComponent from "../../components/MapComponent";

const CountryRootRoutesDetailPage = () => {
  const { countryRoutes } = useRouteLoaderData(
    "country-root-routes-detail"
  ) as CountriesDetailPageRouteData;

  const icon = "/climbing.png";

  return (
    <>
      <RoutesNavigation countryRoutes={countryRoutes} />
      <MapComponent icon={icon} mapItems={countryRoutes} />
      <Outlet />
    </>
  );
};

export default CountryRootRoutesDetailPage;

async function loadCountryRoutes(
  id: string | undefined
): Promise<RoutesDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/routes/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected country." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.countryRoutes;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.countryId;

  return {
    countryRoutes: await loadCountryRoutes(id),
  };
}
