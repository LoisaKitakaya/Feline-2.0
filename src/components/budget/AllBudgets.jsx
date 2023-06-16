import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_ALL_BUDGETS } from "../../assets/schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/reducers/toast";

const AllBudgets = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(GET_ALL_BUDGETS);

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <div>
      {data.getAllBudgets.length !== 0 ? (
        <>
          {data.getAllBudgets.map((budget, index) => {
            const budgetElement = (
              <Link to={`/budget/${budget.id}`} key={budget.id}>
                <div className="mb-4 p-4 rounded-md border">
                  <h6 className="text-xl font-semibold mb-4">
                    {index + 1}. {budget.budget_name}
                  </h6>
                  <div className="flex justify-start items-center">
                    <span className="text-sm">
                      <span className="font-semibold">Account:</span>{" "}
                      {budget.account.account_name}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Category:</span>{" "}
                      {budget.category.category_name}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Amount:</span>{" "}
                      {budget.budget_amount.toLocaleString()}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {budget.budget_is_active ? "active" : "inactive"}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Created:</span>{" "}
                      {moment.unix(budget.created_at).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            );

            return budgetElement;
          })}
        </>
      ) : (
        <>
          <div className="my-20 text-center">
            <h4 className="font-semibold text-2xl">
              You have not created any budgets yet.
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBudgets;
