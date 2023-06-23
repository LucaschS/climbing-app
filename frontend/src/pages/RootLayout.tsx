import { Outlet, useSearchParams } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm";
import Modal from "../components/UI/Modal";
import { useState } from "react";

const RootLayout = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const hideModalHandler = () => {
    setIsModalVisible(false);
  };

  const showModalhandler = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <MainNavigation onLogin={showModalhandler} />
      {isModalVisible && (
        <Modal onClose={hideModalHandler}>
          <AuthForm onClose={hideModalHandler} />
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
