import { Gym } from "../models/interface-models";
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
        {gym.tags.name} - {gym.tags.leisure}
      </h1>
    </article>
  );
}

export default GymItem;
