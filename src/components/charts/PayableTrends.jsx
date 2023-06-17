/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PayableTrends = ({ payables }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction trend by type 'Payable'",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = payables.map((item, index) => index + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Payables",
        data: payables,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
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
      <Line options={options} data={data} />
    </div>
  );
};

export default PayableTrends;
