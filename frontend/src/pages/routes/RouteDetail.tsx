import {
  useRouteLoaderData,
  json,
  LoaderFunctionArgs,
  Outlet,
} from "react-router-dom";
import RouteItem from "../../components/RouteItem";
import { RoutesDetailPageRouteData } from "../../models/interface-models";
import MapComponent from "../../components/MapComponent";
import StarRating from "../../components/StarRating";
import Apex from "../../components/Apex";
import Comment from "../../components/CommentForm";
import CommentsList from "../../components/CommentsList";

function RoutesDetailPage() {
  const icon = "/climbing.png";
  const { route } = useRouteLoaderData(
    "routes-detail"
  ) as RoutesDetailPageRouteData;
  console.log(route, "route");
  // const token = useRouteLoaderData("root") as string;

  // function onLogin(): void {
  //   console.log(token,"token");
  // }

  return (
    <>
      <Outlet />
      <RouteItem route={route} />
      <StarRating rate={route.rate} />
      <MapComponent mapItem={route} icon={icon} />
      <Comment commentItem={route} />
      <CommentsList commentItem={route} />
    </>
  );
}

export default RoutesDetailPage;

async function loadRoute(
  routeId: string | undefined,
  countryId: string | undefined
): Promise<RoutesDetailPageRouteData> {
  const response = await fetch(
    "http://localhost:8070/routes/" + countryId + "/" + routeId
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected route." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.route;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const routeId = params.routeId;
  const countryId = params.countryId;

  return {
    route: await loadRoute(routeId, countryId),
  };
}
