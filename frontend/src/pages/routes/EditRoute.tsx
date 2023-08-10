import { useRouteLoaderData } from "react-router-dom";

import RouteForm from "../../components/RouteForm";
import { CountriesDetailPageRouteData } from "../../models/interface-models";

function EditRoutePage() {
  const { route } = useRouteLoaderData(
    "routes-detail"
  ) as CountriesDetailPageRouteData;

  return <RouteForm method="patch" route={route} />;
}

export default EditRoutePage;
