import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SurgeryTypeChart from '../Components/SurgeryTypeChart';
import FinancialSummary from '../Components/FinancialSummary';

const SummaryCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 min-w-[200px] border border-gray-100">
    <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </div>
);

const App = () => {
  const [summary, setSummary] = useState({
    total: 0,
    funded: 0,
    subsidized: 0,
    selfPaid: 0,
  });

  const navigate = useNavigate();

  // 🧠 Fetch surgeries from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/surgeries"); // change if deployed
        const data = res.data;

        // 🧮 Count types based on surgeryType field
        const total = data.length;
        const funded = data.filter(
          (s) => s.surgeryType?.toLowerCase() === "funded"
        ).length;
        const subsidized = data.filter(
          (s) => s.surgeryType?.toLowerCase() === "subsidized"
        ).length;
        const selfPaid = data.filter(
          (s) =>
            s.surgeryType?.toLowerCase() === "self paid" ||
            s.surgeryType?.toLowerCase() === "self-paid" ||
            s.surgeryType?.toLowerCase() === "selfpaid"
        ).length;

        setSummary({ total, funded, subsidized, selfPaid });
      } catch (err) {
        console.error("Error fetching surgeries:", err);
      }
    };

    fetchData();
  }, []);

  const SUMMARY_STATS = [
    { title: 'Total Surgeries', value: summary.total, color: 'text-indigo-600' },
    { title: 'Donor-Funded', value: summary.funded, color: 'text-green-600' },
    { title: 'Subsidized Cases', value: summary.subsidized, color: 'text-yellow-600' },
    { title: 'Self-Paid Cases', value: summary.selfPaid, color: 'text-red-600' },
  ];

  const FINANCIAL_SUMMARY = [
    { label: 'Total Revenue', amount: ' ₹350,000' },
    { label: 'Donor Funding', amount: ' ₹100,000' },
    { label: 'Subsidized Amount', amount: ' ₹75,000' },
    { label: 'Self-Paid Amount', amount: ' ₹175,000' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <main className="flex-grow p-4 lg:p-8">
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Overview of surgery and billing data for the current month.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("newentry")}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
            >
              <span className="text-2xl mr-1">+</span> New Entry
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="flex flex-wrap gap-4 mb-8">
          {SUMMARY_STATS.map((stat) => (
            <SummaryCard key={stat.title} {...stat} />
          ))}
        </section>

        {/* Chart Placeholder + Financial Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <SurgeryTypeChart/>
          </div>

          {/* Financial Summary */}
            
            <FinancialSummary/>
         
        </section>
      </main>
    </div>
  );
};

export default App;
