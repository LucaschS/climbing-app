import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { useState, useRef, ReactNode } from "react";
import { Gym } from "../models/interface-models";
import { useContext } from "react";
import ModalContext from "../store/ModalContext";

interface CommentProps {
  gym: Gym;
  // onLogin: () => void;
}

interface CommentState {
  author: string;
  date: string;
  comment: string;
}

const CommentAddForm = ({ gym }: CommentProps) => {
  const ctx = useContext(ModalContext);
  const token = useRouteLoaderData("root") as string;

  // const token = useLoaderData();
  console.log(token, "token");

  const authorRef = useRef<HTMLInputElement>(null!);
  const commentRef = useRef<HTMLTextAreaElement>(null!);

  const [commentState, setCommentState] = useState<CommentState>({
    author: "",
    date: "",
    comment: "",
  });
  console.log(commentState, "commentState");

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

    const countryId = gym.cities[0].toLowerCase();
    const gymId = gym.id;
    const url = "http://localhost:8070/gyms/" + countryId + "/" + gymId;

    // const data = await request.formData();

    const formData = {
      author: commentState.author,
      comment: commentState.comment,
      date: commentState.date,
    };

    console.log(formData, "formData");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: formData }),
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
    }
    return;
  };

  return (
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
        Save
      </button>
    </form>
  );
};

export default CommentAddForm;
