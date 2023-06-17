/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_ALL_CASH_FLOW_STATEMENTS } from "../../schema";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { Link } from "react-router-dom";
import moment from "moment";

const AllCashFlow = ({ account_id }) => {
  const dispatch = useDispatch();

  const { data, error, loading } = useQuery(GET_ALL_CASH_FLOW_STATEMENTS, {
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
        Cash Flow Report History
      </h1>
      {data.getAllCashFlowStatements.length !== 0 ? (
        <>
          {data.getAllCashFlowStatements.map((report, index) => {
            const cashFlowElement = (
              <Link to={`/cash-flow/${report.uid}`} key={report.id}>
                <div className="mb-4 p-4 rounded-md border">
                  <h6 className="text-xl font-semibold mb-4">
                    {index + 1}. Cash Flow report for period between{" "}
                    <span className="italic">
                      {moment
                        .unix(report.period_start_date)
                        .format("MMMM Do YYYY")}
                    </span>{" "}
                    and{" "}
                    <span className="italic">
                      {moment
                        .unix(report.period_end_date)
                        .format("MMMM Do YYYY")}
                    </span>
                  </h6>
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-sm">
                      <span className="font-semibold">Period start:</span>{" "}
                      {moment
                        .unix(report.period_start_date)
                        .format("MMMM Do YYYY")}
                    </span>
                    <span className="text-sm">
                      <span className="font-semibold">Period end:</span>{" "}
                      {moment
                        .unix(report.period_end_date)
                        .format("MMMM Do YYYY")}
                    </span>
                    <span className="text-sm">
                      <span className="font-semibold">Report UID:</span>{" "}
                      {report.uid}
                    </span>
                  </div>
                </div>
              </Link>
            );

            return cashFlowElement;
          })}
        </>
      ) : (
        <>
          <div className="my-20 text-center">
            <h4 className="font-semibold text-2xl">
              You have not yet generated any cash flow reports.
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default AllCashFlow;
