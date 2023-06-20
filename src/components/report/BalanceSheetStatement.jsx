/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { GET_BALANCE_SHEET_STATEMENT } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../redux/toast";

const BalanceSheetStatement = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_BALANCE_SHEET_STATEMENT, {
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

export default BalanceSheetStatement;
