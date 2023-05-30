import { Link, useSubmit } from "react-router-dom";
import { GymsDetailPageRouteData } from "../models/interface-models";

function GymItem({ gym }: GymsDetailPageRouteData) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article>
      <h1>{gym.tags.name}</h1>
      <menu>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default GymItem;
