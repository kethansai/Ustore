import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalStyles = {
  transform: "translate(-50%,-50%)",
};

const Modal = ({ flag, onClose, component }) => {
  if (!flag) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-100 bg-gradient-to-r from-pink-200 to-sky-200">
        <div
          style={ModalStyles}
          className="top-2/4 left-2/4 w-11/12 md:w-9/12 fixed z-1000 h-5/6 overflow-y-auto px-10 Modal"
        >
          <a
            className="text-4xl cursor-pointer text-black absolute right-8 top-5"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </a>
          {component}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
