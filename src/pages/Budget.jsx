import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleBudget from "../components/budget/SingleBudget";

const Budget = () => {
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

  return <SingleBudget />;
};

export default Budget;
