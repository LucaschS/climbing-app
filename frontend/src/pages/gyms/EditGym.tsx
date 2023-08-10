import { useRouteLoaderData } from "react-router-dom";

import GymForm from "../../components/GymForm";
import { CountriesDetailPageRouteData } from "../../models/interface-models";

function EditGymPage() {
  const { gym } = useRouteLoaderData(
    "gyms-detail"
  ) as CountriesDetailPageRouteData;

  return <GymForm method="patch" gym={gym} />;
}

export default EditGymPage;
