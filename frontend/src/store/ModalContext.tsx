import React from "react";

interface ContextInterface {
  hideModalHandler: () => void;
  showModalHandler: () => void;
  isModalVisible: boolean;
}

export const ModalContext = React.createContext<ContextInterface>({
  hideModalHandler: () => {},
  showModalHandler: () => {},
  isModalVisible: false,
});

export default ModalContext;
