/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_INCOME_STATEMENT } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";

const IncomeStatement = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_INCOME_STATEMENT, {
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
            <span>Total revenue (Transactions receivable):</span>
            <span>{data.getIncomeStatement.revenue.toLocaleString()}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mx-4">
            <span>Gross profit (Product profit + total revenue):</span>
            <span>{data.getIncomeStatement.gross_profit.toLocaleString()}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mx-4">
            <span>Operating expenses (Transactions payable):</span>
            <span>
              {data.getIncomeStatement.operating_expenses.toLocaleString()}
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mx-4">
            <span className="font-semibold italic">
              Net income (Gross profit - Operating expenses):
            </span>
            <span className="font-semibold italic">
              {data.getIncomeStatement.net_income.toLocaleString()}
            </span>
          </div>
          <hr className="my-4" />
          <div className="mx-4">
            <span className="font-bold text-xl italic">NOTE:</span>
            <br />
            <br />
            <p className="underline mb-2">Total income</p>
            <p className="mb-2">
              Total income refers to the overall revenue earned by a business
              during a specific period, typically a fiscal year. It represents
              the total amount of money generated from the sale of goods,
              provision of services, or other income sources. Total income is
              also known as total revenue or total sales.
            </p>
            <p className="underline mb-2">Gross Profit</p>
            <p className="mb-2">
              Gross profit: Gross profit is the difference between the total
              revenue earned from sales and the cost of goods sold (COGS). It is
              a measure of the profitability of a {"company's"} core operations,
              excluding other expenses such as operating expenses, taxes, and
              interest. Gross profit reveals how efficiently a company can
              produce its goods or services and covers direct costs associated
              with production.
            </p>
            <p className="underline mb-2">Operating expenses</p>
            <p className="mb-2">
              Operating expenses, also known as selling, general, and
              administrative expenses (SG&A), are the costs incurred in running
              a {"business's"} day-to-day operations. These expenses are not
              directly related to the production of goods or services but are
              essential for the ongoing functioning of the business. Examples of
              operating expenses include employee salaries, rent, utilities,
              marketing expenses, insurance, and office supplies.
            </p>
            <p className="underline mb-2">Net income</p>
            <p className="mb-2">
              Net income, also referred to as net profit or net earnings,
              represents the final profitability of a business after accounting
              for all revenues and expenses, including both operating and
              non-operating items. Net income indicates the overall financial
              performance of a company during a specific period and is often
              used to evaluate its profitability. It is calculated by
              subtracting all expenses (including operating expenses, interest,
              taxes, and other non-operating expenses) from the total revenue.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default IncomeStatement;
