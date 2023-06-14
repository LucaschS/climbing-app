import { Link } from "react-router-dom";
import { Gym } from "../models/interface-models";
import StarRating from "./StarRating";
import "leaflet/dist/leaflet.css";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useState } from "react";

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
  const [state, setState] = useState({
    review: "",
    rating: 0, // Initial value
  });
  console.log(state, "state");
  function handleChange(selectedValue: number) {
    // 1. Logs the selected rating (1, 2, 3...)
    console.log(selectedValue, "selectedValue");

    // 2. Do something with or without the value...

    // 3. Update Rating UI
    setState((prevState) => ({
      ...prevState,
      rating: selectedValue,
    }));
  }

  return (
    <article>
      <h1>
        {gym.tags.name} - {gym.tags.leisure}
      </h1>
      <menu>
        <Link to="edit">Edit</Link>
      </menu>
      {/* <StarRating /> */}
      <Rating
        style={{ maxWidth: 3000 }}
        onChange={handleChange}
        value={state.rating}
      />
    </article>
  );
}

export default GymItem;
