import {
  json,
  useLoaderData,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";

import { useState, useRef, ReactNode } from "react";
import { Gym, Cave, Route } from "../models/interface-models";
import { useContext } from "react";
import ModalContext from "../store/ModalContext";

interface CommentProps {
  commentItem: Gym | Cave | Route;
  // onLogin: () => void;
}

interface CommentState {
  author: string;
  date: string;
  comment: string;
}

const CommentAddForm = ({ commentItem }: CommentProps) => {
  const ctx = useContext(ModalContext);
  const token = useRouteLoaderData("root") as string;
  const { countryId, gymId, routeId, caveId } = useParams();

  // const token = useLoaderData();

  const authorRef = useRef<HTMLInputElement>(null!);
  const commentRef = useRef<HTMLTextAreaElement>(null!);

  const [commentState, setCommentState] = useState<CommentState>({
    author: "",
    date: "",
    comment: "",
  });

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    setCommentState({
      ...commentState,
      [event.target.name]: authorRef.current.value,
      date: new Date().toLocaleString(),
    });
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    setCommentState({
      ...commentState,
      [event.target.name]: event.target.value,
      date: new Date().toLocaleString(),
    });
  };

  const submitHandler = async function (event: React.FormEvent<EventTarget>) {
    event.preventDefault();

    if (!commentState.author || !commentState.comment) return;

    let url: string = "";

    if (gymId) {
      url += "http://localhost:8070/gyms/" + countryId + "/" + gymId;
    }

    if (caveId) {
      url += "http://localhost:8070/caves/" + countryId + "/" + caveId;
    }

    if (routeId) {
      url += "http://localhost:8070/routes/" + countryId + "/" + routeId;
    }
    // const data = await request.formData();

    const formData = {
      author: authorRef.current.value,
      comment: commentRef.current.value,
      date: commentState.date,
    };

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify({ comments: formData }),
    });

    if (response.status === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }
  };

  const handleClick = () => {
    if (!token) {
      ctx.showModalHandler();
    } else {
      //tutaj dać przypadek, gdzie bedzie sprawadzanie czy login dodal komentarz
    }
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <label htmlFor="author" className="form__label">
          Author :
        </label>
        <input
          ref={authorRef}
          id="author"
          type="text"
          className="form__input"
          placeholder="author"
          name="author"
          maxLength={35}
          onChange={onValueChange}
          onClick={handleClick}
        />
        <div className="form__label"> Comment:</div>
        <textarea
          ref={commentRef}
          id="comment"
          className="form__input"
          placeholder="comment"
          name="comment"
          maxLength={1200}
          onChange={onTextAreaChange}
          onClick={handleClick}
        />

        {/* <input
        ref={commentRef}
        type="text"
        className="form__counter "
        value={comment}
        onChange={onValueChange}
      /> */}

        <button type="submit" className="form__button">
          Add comment
        </button>
      </form>
    </>
  );
};

export default CommentAddForm;
