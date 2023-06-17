/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalProfitVsExpectedProfit = ({ filteredData }) => {
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
    labels: ["Total Profit", "Expected Profit"],
    datasets: [
      {
        label: "Total of product profits",
        data: [
          filteredData.total_profit_generated,
          filteredData.total_expected_profit,
        ],
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

export default TotalProfitVsExpectedProfit;
