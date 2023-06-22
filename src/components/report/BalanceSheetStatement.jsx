/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_BALANCE_SHEET_STATEMENT } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";

const BalanceSheetStatement = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_BALANCE_SHEET_STATEMENT, {
    variables: { uid: uid },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <>
      {data && (
        <>
          <div className="flex justify-between items-center mx-4">
            <span>Total assets net worth:</span>
            <span>{data.getBalanceSheetStatement.assets.toLocaleString()}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mx-4">
            <span>Total liabilities net worth:</span>
            <span>
              {data.getBalanceSheetStatement.liabilities.toLocaleString()}
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mx-4">
            <span>Total equity net worth:</span>
            <span>{data.getBalanceSheetStatement.equity.toLocaleString()}</span>
          </div>
          <hr className="my-4" />
          <div className="mx-4">
            <span className="font-bold text-xl italic">NOTE:</span>
            <br />
            <br />
            <p className="underline mb-2">Assets</p>
            <p className="mb-2">
              Assets represent the resources owned by a company that have
              economic value and can be measured in monetary terms. They
              encompass tangible and intangible items that a company possesses
              and can use to generate future economic benefits. Examples of
              assets include cash, accounts receivable, inventory, property,
              plant and equipment, investments, and intellectual property.
              Assets are usually categorized as current assets (those expected
              to be converted into cash within one year) and non-current assets
              (those with a longer-term useful life).
            </p>
            <p className="underline mb-2">Liabilities</p>
            <p className="mb-2">
              Liabilities refer to the obligations or debts that a company owes
              to external parties. They represent the {"company's"} legal or
              financial obligations that arise from past transactions or events.
              Liabilities can include loans, accounts payable, accrued expenses,
              deferred revenues, and long-term debt. Similar to assets,
              liabilities are classified as current liabilities (obligations due
              within one year) and non-current liabilities (obligations with a
              longer-term repayment schedule).
            </p>
            <p className="underline mb-2">Equity</p>
            <p className="mb-2">
              Equity, also known as {"shareholders'"} equity or net worth,
              represents the residual interest in the assets of a company after
              deducting liabilities. It represents the ownership claim of the{" "}
              {"company's"} shareholders or owners. Equity is calculated by
              subtracting total liabilities from total assets and reflects the{" "}
              {"company's"} net value. It comprises various components such as
              contributed capital (e.g., common stock), retained earnings
              (accumulated profits not distributed to shareholders), and other
              comprehensive income (gains or losses not included in net income).
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default BalanceSheetStatement;
