import { useRouteLoaderData } from "react-router-dom";
import GymForm from "../components/GymForm";

import { GymsDetailPageRouteData } from "../models/interface-models";
import { Method } from "../models/interface-models";

function EditGymPage() {
  const data = useRouteLoaderData("gyms-detail") as GymsDetailPageRouteData;

  return <GymForm gym={data.gym} method="patch" />;
}

export default EditGymPage;
