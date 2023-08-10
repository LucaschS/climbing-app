import react from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Route } from "../models/interface-models";

interface RouteFormProps {
  route?: Route;
  method: "put" | "post" | "patch" | "delete";
}

function RouteForm({ route, method }: RouteFormProps) {
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
          defaultValue={route ? route.tags.name : ""}
        />
      </p>
      <p>
        <label htmlFor="lat">Latitude</label>
        <input
          id="lat"
          type="number"
          name="lat"
          required
          defaultValue={route ? route.lat : ""}
        />
      </p>
      <p>
        <label htmlFor="lon">Longitude</label>
        <input
          id="lon"
          type="number"
          name="lon"
          required
          defaultValue={route ? route.lon : ""}
        />
      </p>

      <div>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default RouteForm;

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(params, request, "params");

  const method = request.method;

  const data = await request.formData();
  const routeData = {
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

  let url = "http://localhost:8070/routes";

  if (method === "PATCH") {
    const routeId = params.routeId;
    const countryId = params.countryId;
    url = "http://localhost:8070/routes/" + countryId + "/" + routeId;
  }
  // console.log(gymData, "gymData");
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(routeData),
  });

  if (response.status === 422) {
    return response;
  }

  return redirect("/routes");
}
