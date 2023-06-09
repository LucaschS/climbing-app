import { json, useNavigation } from "react-router-dom";
import { useRef } from "react";

interface AuthFormProps {
  onClose: () => void;
}

function AuthForm({ onClose }: AuthFormProps) {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onCloseHandler = () => {
    onClose();
  };

  const submitHandler = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await fetch("http://localhost:8070/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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

    return window.location.replace("/");
  };

  return (
    <form onSubmit={submitHandler} method="post">
      <h1>Create a new user</h1>
      <p>
        <label htmlFor="email"></label>
        <input
          id="email"
          type="email"
          name="email"
          ref={emailRef}
          required
        ></input>
      </p>
      <p>
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          name="password"
          ref={passwordRef}
          required
        ></input>
      </p>
      <div>
        <button>{isSubmitting ? "Submitting..." : "Sign Up"}</button>
      </div>
      <div>
        <button onClick={onCloseHandler}>Cancel</button>
      </div>
    </form>
  );
}

export default AuthForm;
