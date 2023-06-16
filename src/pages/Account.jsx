import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleAccount from "../components/account/SingleAccount";

const Account = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const checkAuth = () => {
    if (isLoggedIn) {
      return;
    } else {
      window.location.href = "/check-auth";
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return <SingleAccount />;
};

export default Account;
