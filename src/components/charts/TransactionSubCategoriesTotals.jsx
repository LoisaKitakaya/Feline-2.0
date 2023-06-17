/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionSubCategoriesTotals = ({ filteredSubcategories }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction breakdown by subcategory",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = filteredSubcategories.map((category) => category.subcategory);

  const data = {
    labels,
    datasets: [
      {
        label: "Subcategory",
        data: filteredSubcategories.map(
          (category) => category.subcategoryAmount
        ),
        fill: false,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
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
      <Bar options={options} data={data} />
    </div>
  );
};

export default TransactionSubCategoriesTotals;
