/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { setNewNotification, clearOldNotification } from "../../redux/toast";
import ButtonSpinner from "../spinner/ButtonSpinner";
import {
  GET_ALL_CASH_FLOW_STATEMENTS,
  GENERATE_CASH_FLOW_STATEMENT,
} from "../../schema";

const GenerateCashFlowReport = ({ account_id }) => {
  const dispatch = useDispatch();

  const [generateCashFlowReport, { data, error, loading }] = useMutation(
    GENERATE_CASH_FLOW_STATEMENT,
    {
      refetchQueries: [
        {
          query: GET_ALL_CASH_FLOW_STATEMENTS,
          variables: { account_id: account_id },
        },
      ],
    }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Report created successfully",
      })
    );
  }

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(clearOldNotification());

        generateCashFlowReport({
          variables: {
            account_id: account_id,
            begin_date: e.target.begin_date.value,
            end_date: e.target.end_date.value,
          },
        });

        e.target.reset();
      }}
    >
      <div className="mb-4">
        <label className="block">
          <span>Begin date</span>
          <input
            type="datetime-local"
            name="begin_date"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>End date</span>
          <input
            type="datetime-local"
            name="end_date"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mt-8 mb-4">
        <button
          type="submit"
          className="w-full rounded-md border py-2 px-4 bg-emerald-500 hover:bg-emerald-600"
        >
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </form>
  );
};

export default GenerateCashFlowReport;
