const PayablesVsReceivablesTotals = ({
  totalReceivables,
  totalPayables,
  totalBalance,
}) => {
  return (
    <div
      className="border rounded-md p-4"
      style={{
        width: "100%",
      }}
    >
      <div className="flex items-center flex-col pt-56">
        <span className="font-semibold text-2xl mb-2">
          Total Account Balance: {totalBalance}
        </span>
        <br />
        <div className="flex items-center mb-2">
          <span className=" text-xl">
            Total Receivable: {totalReceivables.toLocaleString()}
          </span>
          <div className="mx-1"></div>
          <i className="bi bi-caret-up-fill text-green-600 text-2xl"></i>
        </div>
        <div className="flex items-center">
          <span className=" text-xl">
            Total Payable: {totalPayables.toLocaleString()}
          </span>
          <div className="mx-1"></div>
          <i className="bi bi-caret-down-fill text-red-600 text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default PayablesVsReceivablesTotals;
