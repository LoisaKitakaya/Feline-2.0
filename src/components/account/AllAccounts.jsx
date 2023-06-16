import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_ALL_ACCOUNTS } from "../../schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/toast";

const AllAccounts = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(GET_ALL_ACCOUNTS);

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <div>
      {data.getAllAccounts.length !== 0 ? (
        <>
          {data.getAllAccounts.map((account, index) => {
            const accountElement = (
              <Link to={`/account/${account.id}`} key={account.id}>
                <div className="mb-4 p-4 rounded-md border">
                  <h6 className="text-xl font-semibold mb-4">
                    {index + 1}. {account.account_name}
                  </h6>
                  <div className="flex justify-start items-center">
                    <span className="text-sm">
                      <span className="font-semibold">Type:</span>{" "}
                      {account.account_type}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Currency:</span>{" "}
                      {account.currency_code}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Balance:</span>{" "}
                      {account.account_balance.toLocaleString()}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Created:</span>{" "}
                      {moment.unix(account.created_at).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            );

            return accountElement;
          })}
        </>
      ) : (
        <>
          <div className="my-20 text-center">
            <h4 className="font-semibold text-2xl">
              You have not created any accounts yet.
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default AllAccounts;
