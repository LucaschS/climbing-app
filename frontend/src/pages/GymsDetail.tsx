import {
  useRouteLoaderData,
  json,
  LoaderFunctionArgs,
  Outlet,
} from "react-router-dom";
import GymItem from "../components/GymItem";
import { GymsDetailPageRouteData } from "../models/interface-models";
import GymMap from "../components/GymMap";
import StarRating from "../components/StarRating";
import Apex from "../components/Apex";
import Comment from "../components/CommentForm";
import CommentsList from "../components/CommentsList";

function GymsDetailPage() {
  const icon = "/climbing.png";
  const { gym } = useRouteLoaderData("gyms-detail") as GymsDetailPageRouteData;

  // const token = useRouteLoaderData("root") as string;

  // function onLogin(): void {
  //   console.log(token,"token");
  // }
 
  return (
    <>
      <Outlet />
      <GymItem gym={gym} />
     <StarRating rate={gym.rate} />
      {/* <Apex /> */}
      <GymMap gym={gym} icon={icon} />
      <Comment gym={gym} />
      <CommentsList gym={gym} />
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
