import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { GET_ALL_TARGETS, DELETE_TARGET } from "../../assets/schema";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/reducers/toast";

const DeleteTarget = ({ id, target_name }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [deleteTarget, { loading, data, error }] = useMutation(DELETE_TARGET, {
    refetchQueries: [{ query: GET_ALL_TARGETS }],
  });

  if (data) {
    dispatch(
      setNewNotification({
        type: "success",
        message: "Target deleted successfully",
      })
    );
    navigate("/targets");
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

        deleteTarget({
          variables: {
            id: id,
          },
        });

        e.target.reset();
      }}
    >
      <div className="mb-4">
        <p className="text-xl font-semibold">
          Are you sure you want to delete:
          <br /> <br /> {target_name}
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

export default DeleteTarget;
