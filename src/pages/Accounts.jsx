import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/modal/Modal";
import AllAccounts from "../components/account/AllAccounts";
import NewAccount from "../components/account/NewAccount";

const Accounts = () => {
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
          <h4 className="text-2xl font-semibold">Accounts</h4>
          <button
            className="rounded-md border py-2 px-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="bi bi-plus-lg"></i> New Account
          </button>
        </div>
        <p className="text-lg font-thin">
          A collection of all your accounts / businesses
        </p>
      </div>
      {/* Accounts */}
      <AllAccounts />
      {/* Accounts */}

      {/* modal */}
      <Modal
        visible={isOpen}
        setVisible={setIsOpen}
        title={"Create new account"}
        element={<NewAccount setIsOpen={setIsOpen} />}
      />
      {/* modal */}
    </>
  );
};

export default Accounts;
