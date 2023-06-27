import { ReactNode, useState } from "react";
import ModalContext from "./ModalContext";
import { useRouteLoaderData } from "react-router-dom";

export interface ModalProps {
  children?: ReactNode;
}

const ModalProvider = ({ children }: ModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const token = useRouteLoaderData("root") as string;
  // console.log(token);
  console.log(isModalVisible, "isModalVisible context");

  const hideModalHandler = () => {
    setIsModalVisible(false);
  };

  const showModalHandler = () => {
    setIsModalVisible(true);
  };
  const contextValue = {
    hideModalHandler: hideModalHandler,
    showModalHandler: showModalHandler,
    isModalVisible: isModalVisible,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
