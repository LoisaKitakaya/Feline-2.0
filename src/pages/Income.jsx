import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IncomeStatement from "../components/report/IncomeStatement";

const Income = () => {
  const { uid } = useParams();

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
        <h4 className="text-2xl font-semibold">Income Statement</h4>
        <p className="text-lg font-thin italic">
          {
            "An income statement summarizes a company's revenue, expenses, and profitability over a specific period."
          }
        </p>
      </div>
      <hr className="my-2" />
      <IncomeStatement uid={uid} />
    </>
  );
};

export default Income;
