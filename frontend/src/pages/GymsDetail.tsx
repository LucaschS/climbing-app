import { useRouteLoaderData, json, LoaderFunctionArgs } from "react-router-dom";
import GymItem from "../components/GymItem";
import { GymsDetailPageRouteData } from "../models/interface-models";
import GymMap from "../components/GymMap";

function GymsDetailPage() {
  const icon = "/climbing.png";

  const { gym } = useRouteLoaderData("gyms-detail") as GymsDetailPageRouteData;

  console.log(useRouteLoaderData("gyms-detail"), "kutas");

  return (
    <>
      <GymItem gym={gym} />
      <GymMap gym={gym} icon={icon} />
    </>
  );
}

export default GymsDetailPage;

async function loadGym(
  gymId: string | undefined,
  countryId: string | undefined
): Promise<GymsDetailPageRouteData> {
  const response = await fetch(
    "http://localhost:8070/gyms/" + countryId + "/" + gymId
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected gym." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.gym;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const gymId = params.gymId;
  const countryId = params.countryId;
  console.log(params, "chuj");
  return {
    gym: await loadGym(gymId, countryId),
  };
}
