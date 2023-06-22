import React, { MouseEventHandler, ReactNode } from "react";
import Styles from "./Modal.module.css";
import ReactDOM, { createPortal } from "react-dom";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

interface BackdropProps {
  onBackropClose: () => void;
}

interface ModalOverlayProps {
  children?: ReactNode;
}

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const Backdrop = ({ onBackropClose }: BackdropProps) => {
 
  return <div className={Styles.backdrop} onClick={onBackropClose}></div>;
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <>
      {createPortal(<Backdrop onBackropClose={onClose}></Backdrop>, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
