import react, { useState } from "react";
import Styles from "./StarRating.module.css";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  json,
  redirect,
  useNavigation,
  LoaderFunctionArgs,
} from "react-router-dom";

interface rateProps {
  rate: number;
}

const StarRating = ({ rate }: rateProps) => {
  // const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  return (
    <div className={Styles.button}>
      <Form method="patch">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <input
              id={`${index}`}
              type="submit"
              name={`${index}`}
              key={index}
              value={index}
              className={index <= (hover || rate) ? Styles.on : Styles.off}
              // onChange={(e) => {
              //   // setRating(rating);
              // }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rate)}
            ></input>
          );
        })}
      </Form>
    </div>
  );
};

export default StarRating;

export async function action({ params, request }: ActionFunctionArgs) {
  const gymId = params.gymId;
  const countryId = params.countryId?.toLowerCase();
  const url = "http://localhost:8070/gyms/" + countryId + "/" + gymId;

  const data = await request.formData();

  const formData = [
    Number(data.get("1")),
    Number(data.get("2")),
    Number(data.get("3")),
    Number(data.get("4")),
    Number(data.get("5")),
  ];
  const rate = formData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  console.log(rate, "total");

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rate: rate }),
  });

  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }
  return redirect(`/gyms/${countryId}/${gymId}`);
}
