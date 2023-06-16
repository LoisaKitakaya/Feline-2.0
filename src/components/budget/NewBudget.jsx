import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import AccountList from "../recurring/AccountList";
import ButtonSpinner from "../spinner/ButtonSpinner";
import TransactionCategory from "../recurring/TransactionCategory";
import { CREATE_BUDGET, GET_ALL_BUDGETS } from "../../schema";
import TransactionSubCategory from "../recurring/TransactionSubCategory";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const NewBudget = () => {
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [createBudget, { loading, data, error }] = useMutation(CREATE_BUDGET, {
    refetchQueries: [{ query: GET_ALL_BUDGETS }],
  });

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Budget created successfully",
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

        createBudget({
          variables: {
            account_id: e.target.account_id.value,
            budget_name: e.target.budget_name.value,
            budget_description: e.target.budget_description.value,
            budget_amount: e.target.budget_amount.value,
            category: parent,
            sub_category: child,
          },
        });

        e.target.reset();
      }}
    >
      <AccountList />
      <div className="mb-4">
        <label className="block">
          <span>Budget title</span>
          <input
            type="text"
            name="budget_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Budget description</span>
          <textarea
            cols="30"
            rows="10"
            name="budget_description"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Budget amount</span>
          <input
            type="number"
            name="budget_amount"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <TransactionCategory setParent={setParent} />
      {parent && <TransactionSubCategory parent={parent} setChild={setChild} />}
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

export default NewBudget;
