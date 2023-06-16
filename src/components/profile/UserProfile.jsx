import { useState } from "react";
import Modal from "../modal/Modal";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { GET_PROFILE } from "../../assets/schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/reducers/toast";

const UserProfile = () => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const { loading, data, error } = useQuery(GET_PROFILE);

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }
  return (
    <div className="mb-4">
      {data && (
        <>
          <div className="flex justify-between items-center">
            <p className="text-lg">
              Email (username): {data.getProfile.user.username}
            </p>
            <button
              className="rounded-md border py-2 px-4"
              onClick={() => setIsVisible(true)}
            >
              <i className="bi bi-pencil"></i> Update Profile
            </button>
          </div>
          <hr className="my-4" />
          <div>
            <p className="text-lg">
              Profile status:{" "}
              {data.getProfile.user.is_active ? "Active" : "Inactive"}
            </p>
            <p>First name: {data.getProfile.user.first_name}</p>
            <p>Last name: {data.getProfile.user.last_name}</p>
          </div>
          <hr className="my-4" />

          {/* modals */}
          <Modal
            visible={isVisible}
            setVisible={setIsVisible}
            title={"Update your profile"}
            element={<UpdateProfile id={data.getProfile.user.id} />}
          />
          {/* modals */}
        </>
      )}
    </div>
  );
};

export default UserProfile;
