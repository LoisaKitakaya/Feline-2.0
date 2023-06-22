import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleTarget from "../components/target/SingleTarget";

const Target = () => {
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

  return <SingleTarget />;
};

export default Target;
