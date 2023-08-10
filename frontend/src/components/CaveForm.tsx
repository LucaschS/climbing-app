import react from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Cave } from "../models/interface-models";

interface CaveFormProps {
  cave?: Cave;
  method: "put" | "post" | "patch" | "delete";
}

function CaveForm({ cave, method }: CaveFormProps) {
  const data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate(".."); //jeden poziom wyżej
  }

  return (
    <Form method={method}>
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={cave ? cave.tags.name : ""}
        />
      </p>
      <p>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          defaultValue={cave ? cave.tags.phone : ""}
        />
      </p>
    
      <p>
        <label htmlFor="addr:city">addr:city</label>
        <input
          id="addr:city"
          type="text"
          name="addr:city"
          required
          defaultValue={cave ? cave.tags["addr:city"] : ""}
        />
      </p>
      <p>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          type="number"
          name="lat"
          required
          defaultValue={cave ? cave.lat : ""}
        />
      </p>
      <p>
        <label htmlFor="lon">Longitude</label>
        <input
          id="lon"
          type="number"
          name="lon"
          required
          defaultValue={cave ? cave.lon : ""}
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

export default CaveForm;

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(params, request, "params");

  const method = request.method;

  const data = await request.formData();
  const caveData = {
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

  let url = "http://localhost:8070/caves";

  if (method === "PATCH") {
    const gymId = params.gymId;
    const countryId = params.countryId;
    url = "http://localhost:8070/caves/" + countryId + "/" + gymId;
  }
  // console.log(gymData, "gymData");
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(caveData),
  });

  if (response.status === 422) {
    return response;
  }

  return redirect("/caves");
}
