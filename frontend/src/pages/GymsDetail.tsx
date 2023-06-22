import { useRouteLoaderData, json, LoaderFunctionArgs } from "react-router-dom";
import GymItem from "../components/GymItem";
import { GymsDetailPageRouteData } from "../models/interface-models";
import GymMap from "../components/GymMap";
import StarRating from "../components/StarRating";
import Apex from "../components/Apex";
import Comment from "../components/Comment";

function GymsDetailPage() {
  const icon = "/climbing.png";

  const { gym } = useRouteLoaderData("gyms-detail") as GymsDetailPageRouteData;
  return (
    <>
      <GymItem gym={gym} />
      <StarRating rate={gym.rate} />
      <Apex />
      <GymMap gym={gym} icon={icon} />
      <Comment studentEmail={undefined} onCommentUpdate={undefined}/>
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

  return {
    gym: await loadGym(gymId, countryId),
  };
}
