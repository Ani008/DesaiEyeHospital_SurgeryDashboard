import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SurgeryTypeChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fixed surgery types for consistent x-axis
  const SURGERY_TYPES = [
    "Cataract",
    "Cornea",
    "Glaucoma",
    "Lasik",
    "Orbit",
    "Paediatric",
    "Retina",
    "Other",
  ];

  useEffect(() => {
    const fetchSurgeryData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/surgeries");
        const surgeries = res.data;

        // Count surgeries by name
        const counts = surgeries.reduce((acc, s) => {
          const name = s.surgeryName?.trim().toLowerCase();
          if (!name) return acc;
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        // Match counts with fixed labels
        const values = SURGERY_TYPES.map((type) => {
          const key = type.toLowerCase();
          return counts[key] || 0;
        });

        setChartData({
          labels: SURGERY_TYPES,
          datasets: [
            {
              // label removed for cleaner chart
              data: values,
              backgroundColor: "rgba(79, 70, 229, 0.7)", // Indigo-600
              borderColor: "rgba(79, 70, 229, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching surgery data:", err);
      }
    };

    fetchSurgeryData();
  }, []);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading chart...
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // 👈 removes top box
      title: { display: false },  // 👈 removes chart title
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563", // Tailwind gray-600
          font: { size: 12 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#4B5563", stepSize: 1 },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
   
      <div className="h-72">
        <Bar data={chartData} options={options} />
      </div>
  );
};

export default SurgeryTypeChart;
