import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import AccountList from "../recurring/AccountList";
import ButtonSpinner from "../spinner/ButtonSpinner";
import TransactionCategory from "../recurring/TransactionCategory";
import TransactionSubCategory from "../recurring/TransactionSubCategory";
import {
  UPDATE_TARGET,
  GET_TARGET,
  GET_ALL_TARGETS,
} from "../../assets/schema";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/reducers/toast";

const UpdateTarget = ({ id }) => {
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  const [updateTarget, { loading, data, error }] = useMutation(UPDATE_TARGET, {
    refetchQueries: [{ query: GET_TARGET }, { query: GET_ALL_TARGETS }],
  });

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Target updated successfully",
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

        updateTarget({
          variables: {
            id: id,
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

export default UpdateTarget;
