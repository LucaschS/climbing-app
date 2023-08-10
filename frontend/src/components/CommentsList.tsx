import { Link } from "react-router-dom";

import { Gym, Cave, Route } from "../models/interface-models";

interface GymListProps {
  commentItem: Gym | Cave | Route;
}

function CommentsList({ commentItem }: GymListProps) {
  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {commentItem.comments &&
          commentItem.comments.map((x) => (
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
