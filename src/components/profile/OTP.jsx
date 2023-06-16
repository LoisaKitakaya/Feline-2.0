import Verification from "./Verification";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GENERATE_QR_CODE } from "../../assets/schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/reducers/toast";

const OTP = () => {
  const dispatch = useDispatch();

  const oneTimePassword = useSelector(
    (state) => state.security.oneTimePassword
  );

  const { loading, data, error } = useQuery(GENERATE_QR_CODE);

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
          {oneTimePassword === "Verified" ? (
            <div className="text-center">
              <br />
              <i className="bi bi-shield-fill-check text-green-600 text-5xl"></i>
              <br />
              <br />
              <p className=" text-3xl font-semibold">
                Your account is now more secure.
              </p>
              <br />
              <p className=" text-3xl font-semibold">
                You have a second layer of security to protect you data.
              </p>
              <br />
            </div>
          ) : (
            <div className="flex justify-between">
              <img
                style={{
                  width: "35%",
                }}
                className="rounded-md"
                src={`data:image/jpeg;base64,${data.generateQRCode}`}
                alt="qr code"
              />
              <div className="mx-4"></div>
              <div
                style={{
                  width: "60%",
                }}
              >
                <h4 className="text-xl my-4 font-semibold">
                  To enable Two Factor Authentication (2FA), follow these
                  instructions:
                </h4>
                <ul>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Download and install the Google Authenticator app on your
                      mobile device from the respective app store (available for{" "}
                      <a
                        className="underline"
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                      >
                        Android
                      </a>{" "}
                      and{" "}
                      <a
                        className="underline"
                        href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                      >
                        iOS
                      </a>
                      ).
                    </span>
                  </li>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Open the Google Authenticator app on your mobile device.
                    </span>
                  </li>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Within the app, tap the "Scan barcode" or "Add account"
                      option and use the camera to scan the QR code displayed on
                      the screen.
                    </span>
                  </li>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Once the QR code is scanned, the app will automatically
                      recognize the account and display a six-digit verification
                      code.
                    </span>
                  </li>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Enter the verification code displayed in the Google
                      Authenticator app into the corresponding field below.
                    </span>
                  </li>
                  <li className="ml-2 flex justify-start mb-2">
                    <i className="bi bi-arrow-right-short"></i>
                    <div className="mx-1"></div>
                    <span>
                      Submit the verification code and follow any additional
                      instructions provided.
                    </span>
                  </li>
                </ul>
                <hr className="my-4" />
                <Verification />
              </div>
            </div>
          )}
          <hr className="my-4" />
        </>
      )}
    </div>
  );
};

export default OTP;
