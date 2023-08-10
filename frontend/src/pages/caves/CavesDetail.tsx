import {
  useRouteLoaderData,
  json,
  LoaderFunctionArgs,
  Outlet,
} from "react-router-dom";
import CaveItem from "../../components/CaveItem";
import { CavesDetailPageRouteData } from "../../models/interface-models";
import MapComponent from "../../components/MapComponent";
import StarRating from "../../components/StarRating";
import Apex from "../../components/Apex";
import Comment from "../../components/CommentForm";
import CommentsList from "../../components/CommentsList";

function CavesDetailPage() {
  const icon = "/caves.png";
  const { cave } = useRouteLoaderData(
    "caves-detail"
  ) as CavesDetailPageRouteData;
  console.log(cave, "cave");
  // const token = useRouteLoaderData("root") as string;

  // function onLogin(): void {
  //   console.log(token,"token");
  // }

  return (
    <>
      <Outlet />
      <CaveItem cave={cave} />
      <StarRating rate={cave.rate} />
      {/* <Apex /> */}
      <MapComponent mapItem={cave} icon={icon} />
      <Comment commentItem={cave} />
      <CommentsList commentItem={cave} />
    </>
  );
}

export default CavesDetailPage;

async function loadGym(
  caveId: string | undefined,
  countryId: string | undefined
): Promise<CavesDetailPageRouteData> {
  const response = await fetch(
    "http://localhost:8070/caves/" + countryId + "/" + caveId
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
    return resData.cave;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const caveId = params.caveId;
  const countryId = params.countryId;

  return {
    cave: await loadGym(caveId, countryId),
  };
}
