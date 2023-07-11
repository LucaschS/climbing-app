import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import AuthForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

import Modal from "../components/UI/Modal";
import React, { useContext } from "react";
import ModalContext from "../store/ModalContext";

const RootLayout = () => {
  const ctx = useContext(ModalContext);

  return (
    <>
      <MainNavigation />
      {ctx.isModalVisible && (
        <Modal onClose={ctx.hideModalHandler}>
          <AuthForm onClose={ctx.hideModalHandler} />
          <SignUpForm onClose={ctx.hideModalHandler} />
        </Modal>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
