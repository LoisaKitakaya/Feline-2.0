/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ProfitTrend = ({ filteredData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Profit generated from each product",
      },
    },
  };

  const data = {
    labels: filteredData.map((product) => product.product_name),
    datasets: [
      {
        label: "Product profit",
        data: filteredData.map((product) => product.product_profit),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
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
      <Radar options={options} data={data} />
    </div>
  );
};

export default ProfitTrend;
