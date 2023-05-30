import {
  useRouteLoaderData,
  json,
  defer,
  LoaderFunctionArgs,
  Await,
} from "react-router-dom";
import GymItem from "../components/GymItem";
import { Suspense } from "react";
import { GymsDetailPageRouteData } from "../models/interface-models";



function GymsDetailPage() {
  const { gym, gyms } = useRouteLoaderData("gyms-detail") as GymsDetailPageRouteData;
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={gyms}>
          {(loadedGyms) => <GymItem gym={loadedGyms} />}
        </Await>
      </Suspense>
      <Await resolve={gym}>{(loadedGym) => <GymItem gym={loadedGym} />}</Await>
    </>
  );
}

export default GymsDetailPage;

async function loadGym(id: string | undefined): Promise<GymsDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/gyms/" + id);

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

async function loadGyms(): Promise<GymsDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/gyms");
  if (!response.ok) {
    throw json(
      { message: "Could not fetch gyms." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.gyms;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.gymId;
  console.log(params, request, "params");
  return defer({
    gym: await loadGym(id),
    gyms: loadGyms(),
  });
}
