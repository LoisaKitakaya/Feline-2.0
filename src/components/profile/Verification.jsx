import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { VERIFY_OTP } from "../../assets/schema";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { verifyOtpCode } from "../../redux/reducers/2fa";
import {
  setNewNotification,
  clearOldNotification,
} from "../../redux/reducers/toast";

const Verification = () => {
  const dispatch = useDispatch();

  const [verifyOTP, { loading, data, error }] = useMutation(VERIFY_OTP);

  if (data) {
    dispatch(verifyOtpCode(data));
    dispatch(
      setNewNotification({
        type: "success",
        message: "2FA is now enabled",
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
      className="flex justify-start items-center w-full mt-6"
      onSubmit={(e) => {
        e.preventDefault();

        dispatch(clearOldNotification());

        verifyOTP({
          variables: {
            otp: e.target.otp.value,
          },
        });

        e.target.reset();
      }}
    >
      <div className="ml-4">
        <input
          type="text"
          name="otp"
          placeholder="Enter your OTP code here"
          className="block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mx-2"></div>
      <div>
        <button type="submit" className="w-full rounded-md border py-2 px-4">
          {loading ? <ButtonSpinner /> : <span>Submit</span>}
        </button>
      </div>
    </form>
  );
};

export default Verification;
