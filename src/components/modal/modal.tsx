import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./modal.css";

export interface ModalProps {
  children: React.ReactNode;
  header?: string;
  onClose: () => void;
}

interface ModalHeaderProps {
  header?: string;
  onClose: () => void;
}

export enum ModalType {
  PICKED_INGREDIENT,
  ORDER,
}

const ModalHeader = ({ header, onClose }: ModalHeaderProps) => {
  const classes = !header && "modal__no-header-close-icon";
  return (
    <div className="modal__header text text_type_main-large m-4 mt-2">
      {header}
      <span className={`modal__close-icon ${classes}`}>
        <CloseIcon onClick={onClose} type="primary" />
      </span>
    </div>
  );
};

const Modal: FC<ModalProps> = (props) => {
  const { children, header, onClose } = props;
  const modalRoot = document.getElementById("react-modals") as Element;

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div>
      <div className="modal p-2">
        <ModalHeader header={header} onClose={onClose} />
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </div>,
    modalRoot
  );
};

interface ModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className="popup" onClick={onClick}></div>;
};

export default Modal;
