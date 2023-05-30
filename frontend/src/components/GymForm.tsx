import react from "react";
import { Form } from "react-router-dom";
import { GymsDetailPageRouteData } from "../models/interface-models";
import { Method } from "../models/interface-models";



function GymForm({ gym }: GymsDetailPageRouteData, method: Method) {
  console.log(method, "method");
  return (
    <form method={method}>
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={gym ? gym.tags.name : ""}
        />
      </p>
    </form>
  );
}

export default GymForm;
