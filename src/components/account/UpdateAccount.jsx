/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { UPDATE_ACCOUNT, GET_ACCOUNT, GET_ALL_ACCOUNTS } from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const UpdateAccount = ({ id }) => {
  const dispatch = useDispatch();

  const [updateAccount, { loading, data, error }] = useMutation(
    UPDATE_ACCOUNT,
    { refetchQueries: [{ query: GET_ACCOUNT }, { query: GET_ALL_ACCOUNTS }] }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Account updated successfully",
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

        updateAccount({
          variables: {
            id: id,
            account_name: e.target.account_name.value,
            account_type: e.target.account_type.value,
            account_balance: e.target.account_balance.value,
            currency_code: e.target.currency_code.value,
          },
        });

        e.target.reset();
      }}
    >
      <div className="mb-4">
        <label className="block">
          <span>Account name</span>
          <input
            type="text"
            name="account_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Account type</span>
          <input
            type="text"
            name="account_type"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Account balance</span>
          <input
            type="text"
            name="account_balance"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Currency code</span>
          <select
            name="currency_code"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
          </select>
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

export default UpdateAccount;
