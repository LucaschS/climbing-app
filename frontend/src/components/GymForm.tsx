import react from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Gym } from "../models/interface-models";

interface GymFormProps {
  gym?: Gym;
  method: "put" | "post" | "patch" | "delete";
}

function GymForm({ gym, method }: GymFormProps) {
  // console.log(method, "method");
  const data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate(".."); //jeden poziom wyżej
  }
  // console.log(gym, method, " METHOD");
  return (
    <Form method={method}>
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
      <p>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          defaultValue={gym ? gym.tags.phone : ""}
        />
      </p>
      <p>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          name="url"
          required
          defaultValue={gym ? gym.tags.url : ""}
        />
      </p>
      <p>
        <label htmlFor="addr:city">addr:city</label>
        <input
          id="addr:city"
          type="text"
          name="addr:city"
          required
          defaultValue={gym ? gym.tags["addr:city"] : ""}
        />
      </p>
      <p>
        <label htmlFor="addr:housenumber">addr:housenumber</label>
        <input
          id="addr:housenumber"
          type="text"
          name="addr:housenumber"
          required
          defaultValue={gym ? gym.tags["addr:housenumber"] : ""}
        />
      </p>
      <p>
        <label htmlFor="addr:postcode">addr:postcode</label>
        <input
          id="addr:postcode"
          type="text"
          name="addr:postcode"
          required
          defaultValue={gym ? gym.tags["addr:postcode"] : ""}
        />
      </p>
      <p>
        <label htmlFor="addr:street">addr:street</label>
        <input
          id="addr:street"
          type="text"
          name="addr:street"
          required
          defaultValue={gym ? gym.tags["addr:street"] : ""}
        />
      </p>
      <p>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          type="number"
          name="lat"
          required
          defaultValue={gym ? gym.lat : ""}
        />
      </p>
      <p>
        <label htmlFor="lon">Longitude</label>
        <input
          id="lon"
          type="number"
          name="lon"
          required
          defaultValue={gym ? gym.lon : ""}
        />
      </p>
      {/* <p>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          required
          defaultValue={gym ? gym.cities : ""}
        />
      </p> */}
      <div>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default GymForm;

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(params, request, "params");
  const method = request.method;

  const data = await request.formData();
  // console.log(data, "data");
  const gymData = {
    lat: Number(data.get("lat")),
    lon: Number(data.get("lon")),
    tags: {
      url: data.get("url"),
      name: data.get("name"),
      phone: data.get("phone"),
      ["addr:city"]: data.get("addr:city"),
      ["addr:housenumber"]: data.get("addr:housenumber"),
      ["addr:postcode"]: data.get("addr:postcode"),
      ["addr:street"]: data.get("addr:street"),
    },
    // cities: data.get("cities"),
  };

  let url = "http://localhost:8070/gyms";

  if (method === "PATCH") {
    const gymId = params.gymId;
    const countryId = params.countryId;
    // console.log(gymId, countryId, "ids");
    url = "http://localhost:8070/gyms/" + countryId + "/" + gymId;
  }
  //tu sprawdzic

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gymData),
  });

  if (response.status === 422) {
    return response;
  }
  // console.log(response, "response");

  return redirect("/gyms");
}
