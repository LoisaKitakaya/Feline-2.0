import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ACCOUNT } from "../../schema";

const TotalBalance = () => {
  const { id } = useParams();

  const { data, error } = useQuery(GET_ACCOUNT, {
    variables: { id: id },
  });

  if (error) {
    console.log(`${error.message}`);
  }

  return data.getAccount.account_balance.toLocaleString();
};

export default TotalBalance;
