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

const ProductCategoryTotal = ({ filteredData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product profit breakdown by category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = filteredData.map((category) => category.category);

  const data = {
    labels,
    datasets: [
      {
        label: "Category",
        data: filteredData.map((category) => category.categoryAmount),
        fill: false,
        borderColor: "rgb(6, 182, 212)",
        backgroundColor: "rgba(6, 182, 212, 0.5)",
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

export default ProductCategoryTotal;
