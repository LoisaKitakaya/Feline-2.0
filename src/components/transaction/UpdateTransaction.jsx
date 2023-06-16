/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import TransactionType from "../recurring/TransactionType";
import TransactionCategory from "../recurring/TransactionCategory";
import TransactionSubCategory from "../recurring/TransactionSubCategory";
import {
  UPDATE_TRANSACTION,
  GET_ALL_ACCOUNT_TRANSACTIONS,
  GET_ACCOUNT,
} from "../../schema";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/toast";

const UpdateTransaction = ({ account_id, id }) => {
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);
  const [type, setType] = useState(null);

  const [updateTransaction, { loading, data, error }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: [
        {
          query: GET_ALL_ACCOUNT_TRANSACTIONS,
          variables: { account_id: account_id },
        },
        { query: GET_ACCOUNT, variables: { id: account_id } },
      ],
    }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Transaction updated successfully",
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

        updateTransaction({
          variables: {
            id: id,
            account_id: account_id,
            transaction_type: type,
            transaction_amount: parseFloat(e.target.transaction_amount.value),
            transaction_date: e.target.transaction_date.value,
            description: e.target.description.value,
            category: parent,
            sub_category: child,
          },
        });

        e.target.reset();
      }}
    >
      <TransactionType setType={setType} />
      <div className="mb-4">
        <label className="block">
          <span>Transaction amount</span>
          <input
            type="number"
            name="transaction_amount"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Transaction date</span>
          <input
            type="datetime-local"
            name="transaction_date"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Transaction description</span>
          <textarea
            cols="30"
            rows="10"
            name="description"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>
      <TransactionCategory setParent={setParent} />
      {parent && <TransactionSubCategory parent={parent} setChild={setChild} />}
      <div className="mt-8 mb-4">
        <button type="submit" className="w-full rounded-md border py-2 px-4">
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </form>
  );
};

export default UpdateTransaction;
