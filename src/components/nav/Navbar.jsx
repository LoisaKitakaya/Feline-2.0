import { useState } from "react";
import Drawer from "./Drawer";
import ThemeToggle from "../themes/ThemeToggle";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center py-2 px-4 border-b mb-4">
        <a href="" className="hover:text-emerald-600">
          <p className="text-xl font-semibold">Finance Fluent</p>
        </a>
        <div className="flex justify-end items-center">
          <UserButton />
          <div className="mx-2" />
          <ThemeToggle />
          <div className="mx-2" />
          <button
            className="px-2 py-1 cursor-pointer border rounded flex justify-between items-center"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="bi bi-list font-semibold"></i>
            <div className="mx-1"></div>
            <span>Menu</span>
          </button>
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
        <ul className="text-center">
          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/accounts" className="flex justify-between items-center">
              <i className="bi bi-safe flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Accounts</span>
            </Link>
          </li>
          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/invoice" className="flex justify-between items-center">
              <i className="bi bi-receipt flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Invoice</span>
            </Link>
          </li>

          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/target" className="flex justify-between items-center">
              <i className="bi bi-graph-up-arrow flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Target</span>
            </Link>
          </li>
          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/budget" className="flex justify-between items-center">
              <i className="bi bi-piggy-bank flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Budget</span>
            </Link>
          </li>
          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/security" className="flex justify-between items-center">
              <i className="bi bi-shield-lock flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Security</span>
            </Link>
          </li>
          <li className="text-xl my-6 hover:text-emerald-600 cursor-pointer px-8">
            <Link to="/assistant" className="flex justify-between items-center">
              <i className="bi bi-robot flex justify-start ml-8"></i>
              <span>-</span>
              <span className="flex justify-end mr-8">Assistant</span>
            </Link>
          </li>
        </ul>
      </Drawer>
      {/* drawer */}
    </nav>
  );
};

export default Navbar;
