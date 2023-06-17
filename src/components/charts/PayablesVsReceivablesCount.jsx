/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PayablesVsReceivablesCount = ({ receivablesCount, payablesCount }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of 'payable' vs 'receivable' transactions",
      },
    },
  };

  const data = {
    labels: ["Payable", "Receivable"],
    datasets: [
      {
        label: "Count of transactions",
        data: [payablesCount, receivablesCount],
        borderColor: ["rgba(249, 115, 22, 1)", "rgba(14, 165, 233, 1)"],
        backgroundColor: ["rgba(249, 115, 22, 0.2)", "rgba(14, 165, 233, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="border rounded-md p-4"
      style={{
        width: "100%",
      }}
    >
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default PayablesVsReceivablesCount;
