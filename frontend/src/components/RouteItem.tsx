import { Link, useRouteLoaderData } from "react-router-dom";
import { Route } from "../models/interface-models";
import StarRating from "./StarRating";
import "leaflet/dist/leaflet.css";

interface GymCountryItemProps {
  route: Route;
}

function GymItem({ route }: GymCountryItemProps) {
  const token = useRouteLoaderData("root") as string;

  // const submit = useSubmit();
  // function startDeleteHandler() {
  //   const proceed = window.confirm("Are you sure?");

  //   if (proceed) {
  //     submit(null, { method: "delete" });
  //   }
  // }

  return (
    <article>
      <h1>{route.tags.name}</h1>
      <menu>{token ? <Link to="edit">Edit</Link> : null}</menu>
    </article>
  );
}

export default GymItem;
