import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import AccountList from "../recurring/AccountList";
import ButtonSpinner from "../spinner/ButtonSpinner";
import TransactionCategory from "../recurring/TransactionCategory";
import { CREATE_TARGET, GET_ALL_TARGETS } from "../../assets/schema";
import TransactionSubCategory from "../recurring/TransactionSubCategory";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/reducers/toast";

const NewTarget = () => {
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [createTarget, { loading, data, error }] = useMutation(CREATE_TARGET, {
    refetchQueries: [{ query: GET_ALL_TARGETS }],
  });

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Target created successfully",
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

        createTarget({
          variables: {
            account_id: e.target.account_id.value,
            target_name: e.target.target_name.value,
            target_description: e.target.target_description.value,
            target_amount: parseFloat(e.target.target_amount.value),
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
          <span>Target title</span>
          <input
            type="text"
            name="target_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Target description</span>
          <textarea
            cols="30"
            rows="10"
            name="target_description"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Target amount</span>
          <input
            type="number"
            name="target_amount"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
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

export default NewTarget;
