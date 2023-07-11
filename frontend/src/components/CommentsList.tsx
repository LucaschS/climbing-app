import { Link } from "react-router-dom";

import { Gym } from "../models/interface-models";

interface GymListProps {
  gym: Gym;
}

function CommentsList({ gym }: GymListProps) {

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {gym.comments &&
          gym.comments.map((x) => (
            <>
              <li>{x.author}</li>
              <li>{x.email}</li>
              <li>{x.comment}</li>
            </>
          ))}
      </ul>
    </div>
  );
}

export default CommentsList;
