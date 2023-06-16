/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import {
  DELETE_TRANSACTION,
  GET_ALL_ACCOUNT_TRANSACTIONS,
  GET_ACCOUNT,
} from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const DeleteTransaction = ({ account_id, id, confirmDelete }) => {
  const dispatch = useDispatch();

  const [deleteTransaction, { loading, data, error }] = useMutation(
    DELETE_TRANSACTION,
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
        message: "Transaction deleted successfully",
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

        deleteTransaction({
          variables: {
            id: id,
            account_id: account_id,
          },
        });

        e.target.reset();

        confirmDelete(false);
      }}
    >
      <div className="mb-4">
        <p className="text-xl font-semibold">
          Are you sure you want to delete:
          <br /> <br /> ID: {id}
        </p>
      </div>
      <div className="mt-8 mb-4">
        <button type="submit" className="w-full rounded-md border py-2 px-4">
          {loading ? <ButtonSpinner /> : <span>Delete</span>}
        </button>
      </div>
    </form>
  );
};

export default DeleteTransaction;
