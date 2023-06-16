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

const ReceivableTrends = ({ receivables }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction trend by type 'Receivable'",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = receivables.map((item, index) => index + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Receivables",
        data: receivables,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
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

export default ReceivableTrends;
