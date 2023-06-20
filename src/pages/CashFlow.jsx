import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CashFlowStatement from "../components/report/CashFlowStatement";

const CashFlow = () => {
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
        <h4 className="text-2xl font-semibold">Cash Flow Statement</h4>
        <p className="text-lg font-thin italic">
          A cash flow statement tracks the movement of cash in and out of a
          business.
        </p>
      </div>
      <hr className="my-2" />
      <CashFlowStatement uid={uid} />
    </>
  );
};

export default CashFlow;
