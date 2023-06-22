import React, { useState } from "react";

import {useActionData,
  ActionFunctionArgs,
  json,
  redirect,
  useNavigate,
} from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Modal from "../components/UI/Modal";

function AuthenticationPage() {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal onClose={onClose}>
        <AuthForm />
      </Modal>
    </>
  );
}

export default AuthenticationPage;

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
