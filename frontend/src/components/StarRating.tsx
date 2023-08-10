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
  useRouteLoaderData,
} from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { getAuthToken } from "../util/auth";

interface rateProps {
  rate: number[] | undefined;
}

const StarRating = ({ rate }: rateProps) => {
  // const [rating, setRating] = useState<number>(0);

  const [hover, setHover] = useState<number>(0);
  const token = useRouteLoaderData("root") as string;

  let averageRate = 0;

  if (rate) {
    const reducedRate = rate.reduce((total, value) => {
      return total + value;
    });

    averageRate = +Math.round(reducedRate / rate.length);
  }

  console.log(averageRate, "averageRate");

  return (
    <div className={Styles.button}>
      Rate this gym
      <Form method="patch">
        {[...Array(10)].map((star, index) => {
          index += 1;
          return (
            <button
              disabled={token === null}
              id={`${index}`}
              type="submit"
              name={`${index}`}
              key={index}
              value={index}
              // className={
              //   index <= ((rate && hover) || rate) ? Styles.on : Styles.off
              // }
              // onChange={(e) => {
              //   // setRating(rating);
              // }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(averageRate)}
            >
              {index <= ((averageRate && hover) || averageRate) ? (
                <FcLike />
              ) : (
                <FcLikePlaceholder />
              )}
            </button>
          );
        })}
      </Form>
    </div>
  );
};

export default StarRating;

export async function action({ params, request }: ActionFunctionArgs) {
  const gymId = params.gymId;
  const caveId = params.caveId;
  const routeId = params.routeId;
  const countryId = params.countryId?.toLowerCase();

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

  console.log(url, "url");

  const data = await request.formData();

  const formData = [
    Number(data.get("1")),
    Number(data.get("2")),
    Number(data.get("3")),
    Number(data.get("4")),
    Number(data.get("5")),
    Number(data.get("6")),
    Number(data.get("7")),
    Number(data.get("8")),
    Number(data.get("9")),
    Number(data.get("10")),
  ];
  const rate = formData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });

  const token = getAuthToken();

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

  if (gymId) {
    return redirect(`/gyms/${countryId}/${gymId}`);
  }
  if (caveId) {
    return redirect(`/caves/${countryId}/${caveId}`);
  }
  if (routeId) {
    return redirect(`/routes/${countryId}/${routeId}`);
  }
}
