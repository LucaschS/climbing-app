import React, { useContext } from "react";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import Styles from "./Navbar.module.css";
import ModalContext from "../store/ModalContext";

interface MainNavigationProps {
  onLogin: () => void;
}

const MainNavigation = () => {
  const ctx = useContext(ModalContext);
  const token = useRouteLoaderData("root") as string;

  console.log(token, "token");
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
      {!token && <button onClick={ctx.showModalHandler}>Login</button>}
      {token && (
        <Form action="/logout" method="post">
          <button>Logout</button>
        </Form>
      )}
    </header>
  );
};

export default MainNavigation;
