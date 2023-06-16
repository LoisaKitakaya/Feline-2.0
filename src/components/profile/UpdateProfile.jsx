import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { removeItemFromCache } from "../../main";
import { UPDATE_USER } from "../../assets/schema";
import { signOut } from "../../redux/reducers/auth";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { revokeLogin } from "../../redux/reducers/2fa";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/reducers/toast";

const UpdateProfile = ({ id }) => {
  const dispatch = useDispatch();

  const [updateUser, { loading, data, error }] = useMutation(UPDATE_USER);

  const postUpdateAction = (user_id) => {
    removeItemFromCache("User", user_id);
    dispatch(signOut());
    dispatch(revokeLogin());
  };

  if (data) {
    postUpdateAction(id);
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

        const check = confirm(
          "This action will cause you to be logged out, and you will have to log in again.\n Are you sure you want to continue?"
        );

        if (check) {
          updateUser({
            variables: {
              email: e.target.email.value,
              first_name: e.target.first_name.value,
              last_name: e.target.last_name.value,
            },
          });

          e.target.reset();
        } else {
          return;
        }
      }}
    >
      <div className="mb-4">
        <label className="block">
          <span>Email</span>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>First name</span>
          <input
            type="text"
            name="first_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          <span>Last name</span>
          <input
            type="text"
            name="last_name"
            className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mt-8 mb-4">
        <button type="submit" className="w-full rounded-md border py-2 px-4">
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
