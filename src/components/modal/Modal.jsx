/* eslint-disable react/prop-types */
import { useEffect } from "react";

import "./modal.css";

const Modal = ({ visible, setVisible, title, element }) => {
  const openModal = () => {
    const dialog = document.getElementById("modal-dialog");
    dialog.showModal();
    setVisible(true);
  };

  const closeModal = () => {
    const dialog = document.getElementById("modal-dialog");
    dialog.close();
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
      id="modal-dialog"
      style={{
        width: "30%",
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">{title}</p>
        <button onClick={() => closeModal()}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <hr className="mb-4" />
      {element}
    </dialog>
  );
};

export default Modal;
