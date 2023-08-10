import { useRouteLoaderData } from "react-router-dom";

import CaveForm from "../../components/CaveForm";
import { CountriesDetailPageRouteData } from "../../models/interface-models";

function EditCavePage() {
  const { cave } = useRouteLoaderData(
    "caves-detail"
  ) as CountriesDetailPageRouteData;

  return <CaveForm method="patch" cave={cave} />;
}

export default EditCavePage;
