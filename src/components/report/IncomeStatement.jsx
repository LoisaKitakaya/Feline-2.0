/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_INCOME_STATEMENT } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";

const IncomeStatement = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_INCOME_STATEMENT, {
    variables: { uid: uid },
  });

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return <>{data && <></>}</>;
};

export default IncomeStatement;
