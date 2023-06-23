import React from "react";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import Styles from "./Navbar.module.css";

interface MainNavigationProps {
  onLogin: () => void;
}

const MainNavigation = (props: MainNavigationProps) => {
  const token = useRouteLoaderData("root") as string;
  const onLoginHandler = () => {
    props.onLogin();
  };

  // const onLogoutHandler = () => {
  //  token.
  // };

  return (
    <header className={Styles.header}>
      <nav>
        <ul className={Styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gyms">Gyms</Link>
          </li>
        </ul>
      </nav>
      {!token && <button onClick={onLoginHandler}>Login</button>}
      {token && (
        <Form action="/logout" method="post">
          <button>Logout</button>
        </Form>
      )}
    </header>
  );
};

export default MainNavigation;
