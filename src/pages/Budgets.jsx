import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/modal/Modal";
import AllBudgets from "../components/budget/AllBudgets";
import NewBudget from "../components/budget/NewBudget";

const Budgets = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const checkAuth = () => {
    if (isLoggedIn) {
      return;
    } else {
      window.location.href = "/check-auth";
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-semibold">Budgets</h4>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="bi bi-plus-lg"></i> New Budgets
          </button>
        </div>
        <p className="text-lg font-thin">
          A collection of all your budgets
        </p>
      </div>
      {/* Budgets */}
      <AllBudgets />
      {/* Budgets */}

      {/* modal */}
      <Modal
        visible={isOpen}
        setVisible={setIsOpen}
        title={"Create new budget"}
        element={<NewBudget setIsOpen={setIsOpen} />}
      />
      {/* modal */}
    </>
  );
};

export default Budgets;
