/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import useMountTransition from "../effects/useMountTransition";

import "./drawer.css";

const createPortalRoot = () => {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");

  return drawerRoot;
};

const Drawer = ({
  isOpen,
  children,
  className,
  onClose,
  position = "right",
  removeWhenClosed = true,
}) => {
  const bodyRef = useRef(document.querySelector("body"));
  const portalRootRef = useRef(
    document.getElementById("drawer-root") || createPortalRoot()
  );

  const isTransitioning = useMountTransition(isOpen, 300);

  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={classNames("drawer-container", {
        open: isOpen,
        in: isTransitioning,
        className,
      })}
    >
      <div className={classNames("drawer", position)} role="dialog">
        {children}
      </div>
      <div className="backdrop" onClick={onClose} />
    </div>,
    portalRootRef.current
  );
};

export default Drawer;
