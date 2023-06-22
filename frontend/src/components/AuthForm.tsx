import {
  ActionFunctionArgs,
  Form,
  Link,
  json,
  redirect,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import Modal from "./UI/Modal";
import { useState } from "react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Form method="post">
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email"></label>
          <input id="email" type="email" name="email" required></input>
        </p>
        <p>
          <label htmlFor="password"></label>
          <input id="password" type="password" name="password" required></input>
        </p>
        <div>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Signup" : "Login"}
          </Link>
          <button>{isSubmitting ? "Submitting..." : "Save"}</button>
        </div>

        {/* <div>
          <button onClick={onClose}>Cancel</button>
        </div> */}
      </Form>
    </>
  );
}

export default AuthForm;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  console.log(searchParams, "mode");

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(authData, "authdata");
  const response = await fetch("http://localhost:8070/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const responseData = await response.json();
  const token = responseData.token;
  localStorage.setItem("token", token);

  return redirect("/");
}
