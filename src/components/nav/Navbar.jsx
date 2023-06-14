import { useState } from "react";
import Drawer from "./Drawer";
import ThemeToggle from "../themes/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center py-2 px-4 border-b mb-4">
        <a href="" className="hover:text-emerald-600">
          <p className="text-xl font-semibold">Finance Fluent</p>
        </a>
        <div className="flex justify-end items-center">
          <ThemeToggle />
          <div className="mx-2" />
          <div className="flex justify-between items-center">
            <button
              className="px-2 py-1 cursor-pointer border rounded flex justify-between items-center"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Menu</span>
              <div className="mx-1"></div>
              <i className="bi bi-list font-semibold"></i>
            </button>
          </div>
        </div>
      </div>

      {/* drawer */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-lg text-center font-semibold my-2">Menu</p>
        <hr
          style={{
            margin: "0.85rem 0",
          }}
        />
      </Drawer>
      {/* drawer */}
    </nav>
  );
};

export default Navbar;
