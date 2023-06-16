/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import "./modal.css";

const Modal = ({ visible, setVisible, title, element }) => {
  const dialogRef = useRef(null);

  const openModal = () => {
    dialogRef.current.showModal();
    setVisible(true);
  };

  const closeModal = () => {
    dialogRef.current.close();
    setVisible(false);
  };

  useEffect(() => {
    if (visible === true) {
      openModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <dialog
      className="rounded border"
      ref={dialogRef}
      style={{
        width: "30%",
      }}
    >
      <div className="sticky top-0 dialog-header pt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold">{title}</p>
          <button onClick={() => closeModal()}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <hr className="mb-4" />
      </div>
      {element}
    </dialog>
  );
};

export default Modal;
