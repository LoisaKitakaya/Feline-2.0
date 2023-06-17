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

const ProductSubCategoryTotal = ({ filteredData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product profit breakdown by subcategory",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = filteredData.map((subcategory) => subcategory.subcategory);

  const data = {
    labels,
    datasets: [
      {
        label: "Category",
        data: filteredData.map((subcategory) => subcategory.subcategoryAmount),
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

export default ProductSubCategoryTotal;
