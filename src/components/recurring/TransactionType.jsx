import { useQuery } from "@apollo/client";
import { TRANSACTION_TYPES } from "../../schema";

// eslint-disable-next-line react/prop-types
const TransactionType = ({ setType }) => {
  const { data, error } = useQuery(TRANSACTION_TYPES);

  if (error) {
    console.log(`${error.message}`);
  }

  return (
    <div className="mb-4">
      <label className="block">
        <span>Transaction type</span>
        <select
          name="transaction_type"
          className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setType(e.target.value)}
        >
          <option selected>Select the type of transaction</option>
          {data &&
            data.getTransactionType.map((transactionType) => {
              const options = (
                <>
                  <option
                    key={transactionType.id}
                    value={transactionType.type_name}
                  >
                    {transactionType.type_name}
                  </option>
                </>
              );

              return options;
            })}
        </select>
      </label>
    </div>
  );
};

export default TransactionType;
