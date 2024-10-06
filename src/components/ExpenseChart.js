import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  // Calculate total expenses by category
  const categories = {};
  expenses.forEach((entry) => {
    if (!categories[entry.type]) {
      categories[entry.type] = 0;
    }
    categories[entry.type] += parseInt(entry.amount); // Sum up the amounts per category
  });
  // Prepare data for the chart
  const data = {
    labels: Object.keys(categories), // Expense categories
    datasets: [
      {
        label: "Total Expenses ($)",
        data: Object.values(categories), // Corresponding amounts
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red for category 1
          "rgba(54, 162, 235, 0.6)", // Blue for category 2
          "rgba(75, 192, 192, 0.6)", // Light Blue for category 3
          "rgba(255, 206, 86, 0.6)", // Yellow for category 4
          "rgba(153, 102, 255, 0.6)", // Purple for category 5
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Minimum value for the Y-axis (this is redundant if `beginAtZero` is true)
        max: 10000,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString(); // Format the Y-axis as currency
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Expenses by Category",
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Expenses By Category</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
