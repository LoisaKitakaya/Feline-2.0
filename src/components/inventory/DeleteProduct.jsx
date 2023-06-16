/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from "../../schema";
import { setNewNotification, clearOldNotification } from "../../redux/toast";

const DeleteProduct = ({ account_id, id, confirmDelete }) => {
  const dispatch = useDispatch();

  const [deleteProduct, { loading, data, error }] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS,
          variables: { account_id: account_id },
        },
      ],
    }
  );

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Product deleted successfully",
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

        deleteProduct({
          variables: {
            id: id,
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
        <button
          type="submit"
          className="w-full rounded-md border py-2 px-4 bg-red-500 hover:bg-red-600"
        >
          {loading ? <ButtonSpinner /> : <span>Delete</span>}
        </button>
      </div>
    </form>
  );
};

export default DeleteProduct;
