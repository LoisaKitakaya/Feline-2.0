import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_ALL_TARGETS } from "../../assets/schema";
import ComponentSpinner from "../spinner/ComponentSpinner";
import { setNewNotification } from "../../redux/reducers/toast";

const AllTargets = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(GET_ALL_TARGETS);

  if (loading) return <ComponentSpinner />;

  if (error) {
    dispatch(
      setNewNotification({ type: "error", message: `${error.message}` })
    );
  }

  return (
    <div>
      {data.getAllTargets.length !== 0 ? (
        <>
          {data.getAllTargets.map((target, index) => {
            const budgetElement = (
              <Link to={`/target/${target.id}`} key={target.id}>
                <div className="mb-4 p-4 rounded-md border">
                  <h6 className="text-xl font-semibold mb-4">
                    {index + 1}. {target.target_name}
                  </h6>
                  <div className="flex justify-start items-center">
                    <span className="text-sm">
                      <span className="font-semibold">Account:</span>{" "}
                      {target.account.account_name}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Category:</span>{" "}
                      {target.category.category_name}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Amount:</span>{" "}
                      {target.target_amount.toLocaleString()}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {target.target_is_active ? "active" : "inactive"}
                    </span>
                    <div className="mx-2"></div>
                    <span className="text-sm">
                      <span className="font-semibold">Created:</span>{" "}
                      {moment.unix(target.created_at).fromNow()}
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
              You have not created any targets yet.
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTargets;
