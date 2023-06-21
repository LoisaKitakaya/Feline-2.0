/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_CASH_FLOW_STATEMENT } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";
import { CFOperations, sumUpAmounts } from "./operations";

const CashFlowStatement = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_CASH_FLOW_STATEMENT, {
    variables: { uid: uid },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  const cashFlowObject = data && new CFOperations(data.getCashFlowStatement);

  const operatingActivities = cashFlowObject.operatingActivities();

  const investingActivities = cashFlowObject.investingActivities();

  const financingActivities = cashFlowObject.financingActivities();

  const totalOR = sumUpAmounts(
    cashFlowObject.operatingReceivables(operatingActivities)
  );

  const totalOP = sumUpAmounts(
    cashFlowObject.operatingPayables(operatingActivities)
  );

  const totalIR = sumUpAmounts(
    cashFlowObject.investingReceivables(investingActivities)
  );

  const totalIP = sumUpAmounts(
    cashFlowObject.investingPayables(investingActivities)
  );

  const totalFR = sumUpAmounts(
    cashFlowObject.financingReceivables(financingActivities)
  );

  const totalFP = sumUpAmounts(
    cashFlowObject.financingPayables(financingActivities)
  );

  const netEarnings = totalOR + totalOP + totalIR + totalIP + totalFR + totalFP;

  const totalOperatingCashFlow = totalOR - totalOP;

  const totalInvestingCashFlow = totalIR - totalIP;

  const totalFinancingCashFlow = totalFR - totalFP;

  const netCashFlow =
    totalOperatingCashFlow + totalInvestingCashFlow + totalFinancingCashFlow;

  return (
    <>
      {data && (
        <>
          {operatingActivities.length !== 0 && (
            <>
              <span className="text-lg font-semibold mb-4">
                Cash flow from operating activities
              </span>
              <hr className="my-4" />
              {operatingActivities.map((item) => {
                const recordElement = (
                  <div key={item.record.id}>
                    <div className="flex justify-between items-end mb-4 px-4">
                      <div>
                        <span>Transaction: {item.record.item}</span>
                        <br />
                        <span>Category: {item.record.category}</span>
                      </div>
                      <div>
                        <span>
                          Amount: {item.record.amount.toLocaleString()} (
                          {item.record.is_income ? "Receivable" : "Payable"})
                        </span>
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </div>
                );

                return recordElement;
              })}
              <div className="flex justify-end items-center gap-2 px-4 italic">
                <span className="font-semibold">Gross Total:</span>{" "}
                <span className="font-semibold">
                  {totalOperatingCashFlow.toLocaleString()}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}

          {investingActivities.length !== 0 && (
            <>
              <span className="text-lg font-semibold mb-4">
                Cash flow from investing activities
              </span>
              <hr className="my-4" />
              {investingActivities.map((item) => {
                const recordElement = (
                  <div key={item.record.id}>
                    <div className="flex justify-between items-end mb-4 px-4">
                      <div>
                        <span>Transaction: {item.record.item}</span>
                        <br />
                        <span>Category: {item.record.category}</span>
                      </div>
                      <div>
                        <span>
                          Amount: {item.record.amount.toLocaleString()} (
                          {item.record.is_income ? "Receivable" : "Payable"})
                        </span>
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </div>
                );

                return recordElement;
              })}
              <div className="flex justify-end items-center gap-2 px-4 italic">
                <span className="font-semibold">Gross Total:</span>{" "}
                <span className="font-semibold">
                  {totalInvestingCashFlow.toLocaleString()}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}

          {financingActivities.length !== 0 && (
            <>
              <span className="text-lg font-semibold mb-4">
                Cash flow from Financing activities
              </span>
              <hr className="my-4" />
              {financingActivities.map((item) => {
                const recordElement = (
                  <div key={item.record.id}>
                    <div className="flex justify-between items-end mb-4 px-4">
                      <div>
                        <span>Transaction: {item.record.item}</span>
                        <br />
                        <span>Category: {item.record.category}</span>
                      </div>
                      <div>
                        <span>
                          Amount: {item.record.amount.toLocaleString()} (
                          {item.record.is_income ? "Receivable" : "Payable"})
                        </span>
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </div>
                );

                return recordElement;
              })}
              <div className="flex justify-end items-center gap-2 px-4 italic">
                <span className="font-semibold">Gross Total:</span>{" "}
                <span className="font-semibold">
                  {totalFinancingCashFlow.toLocaleString()}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
          {/* <br /> */}
          <div className="flex justify-end items-center gap-2 px-4 text-2xl italic">
            <span className="font-semibold">Net Earnings:</span>{" "}
            <span className="font-semibold">
              {netEarnings.toLocaleString()}
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-end items-center gap-2 px-4 text-2xl italic">
            <span className="font-semibold">Net Cash Flow:</span>{" "}
            <span className="font-semibold">
              {netCashFlow.toLocaleString()}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default CashFlowStatement;
