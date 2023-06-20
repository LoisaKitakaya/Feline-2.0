import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BalanceSheetStatement from "../components/report/BalanceSheetStatement";

const BalanceSheet = () => {
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
        <h4 className="text-2xl font-semibold">Balance Sheet Statement</h4>
        <div className="flex justify-between items-center">
          <p className="text-lg font-thin italic">
            {
              "A balance sheet statement provides a snapshot of a company's assets, liabilities, and shareholders' equity."
            }
          </p>
          <button className="rounded-md border py-2 px-4">
            <i className="bi bi-download"></i> Download report
          </button>
        </div>
      </div>
      <hr className="my-2" />
      <BalanceSheetStatement uid={uid} />
    </>
  );
};

export default BalanceSheet;
