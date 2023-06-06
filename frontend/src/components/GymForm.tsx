import react from "react";
import { Form } from "react-router-dom";
import { Gym } from "../models/interface-models";

interface GymFormProps {
  gym?: Gym;
  method: "put" | "post" | "patch" | "delete";
}

function GymForm({ gym, method }: GymFormProps) {
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
