/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_ALL_BALANCE_SHEET_STATEMENTS } from "../../schema";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";
import ComponentSpinner from "../spinner/ComponentSpinner";
import moment from "moment";
import { Link } from "react-router-dom";

const AllBalanceSheet = ({ account_id }) => {
  const dispatch = useDispatch();

  const { data, error, loading } = useQuery(GET_ALL_BALANCE_SHEET_STATEMENTS, {
    variables: { account_id: account_id },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <>
      <h1 className="text-xl mb-4 underline italic">
        Balance Sheet Report History
      </h1>
      {data.getAllBalanceSheetStatements.length !== 0 ? (
        <>
          {data.getAllBalanceSheetStatements.map((report, index) => {
            const balanceSheetElement = (
              <Link to={`/balance-sheet/${report.uid}`} key={report.id}>
                <div className="mb-4 p-4 rounded-md border">
                  <h6 className="text-xl font-semibold mb-4">
                    {index + 1}. Balance sheet report | created on:{" "}
                    <span className="italic">
                      {moment.unix(report.created_at).format("MMMM Do YYYY")}
                    </span>
                  </h6>
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-sm">
                      <span className="font-semibold">Report UID:</span>{" "}
                      {report.uid}
                    </span>
                  </div>
                </div>
              </Link>
            );

            return balanceSheetElement;
          })}
        </>
      ) : (
        <>
          <div className="my-20 text-center">
            <h4 className="font-semibold text-2xl">
              You have not yet generated any balance sheet reports.
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default AllBalanceSheet;
