/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { GET_ALL_ACCOUNTS, DELETE_ACCOUNT } from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const DeleteAccount = ({ id, account_name }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [deleteAccount, { loading, data, error }] = useMutation(
    DELETE_ACCOUNT,
    { refetchQueries: [{ query: GET_ALL_ACCOUNTS }] }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Account deleted successfully",
      })
    );
    navigate("/accounts");
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

        deleteAccount({
          variables: {
            id: id,
          },
        });

        e.target.reset();
      }}
    >
      <div className="mb-4 text-center">
        <p className="text-xl font-semibold">
          Are you sure you want to delete:
          <br /> <br /> {account_name}
        </p>
      </div>
      <div className="mt-8 mb-4">
        <button
          type="submit"
          className="w-full rounded-md border py-2 px-4 bg-emerald-500 hover:bg-emerald-600"
        >
          {loading ? <ButtonSpinner /> : <span>Delete</span>}
        </button>
      </div>
    </form>
  );
};

export default DeleteAccount;
