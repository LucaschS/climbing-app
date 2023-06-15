import { Link } from "react-router-dom";
import { Gym } from "../models/interface-models";
import StarRating from "./StarRating";
import "leaflet/dist/leaflet.css";

interface GymCountryItemProps {
  gym: Gym;
}

function GymItem({ gym }: GymCountryItemProps) {
  // const submit = useSubmit();
  // function startDeleteHandler() {
  //   const proceed = window.confirm("Are you sure?");

  //   if (proceed) {
  //     submit(null, { method: "delete" });
  //   }
  // }

  return (
    <article>
      <h1>
        {gym.tags.name} - {gym.tags.leisure} - {gym.rate}
      </h1>
      <menu>
        <Link to="edit">Edit</Link>
      </menu>
    </article>
  );
}

export default GymItem;
