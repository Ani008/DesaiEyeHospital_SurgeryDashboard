import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryPill = ({ category }) => {
  let colorClasses = "";
  let formatted = category;

  switch (category?.toUpperCase()) {
    case "FUNDED":
      colorClasses = "bg-blue-100 text-blue-700";
      formatted = "Donor Funded";
      break;
    case "SUBSIDIZED":
      colorClasses = "bg-yellow-100 text-yellow-700";
      formatted = "Subsidized";
      break;
    case "SELF":
    case "SELF-PAID":
      colorClasses = "bg-indigo-100 text-indigo-700";
      formatted = "Self-Paid";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-700";
      formatted = category || "N/A";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}
    >
      {formatted}
    </span>
  );
};

const SurgeriesPage = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [filteredSurgeries, setFilteredSurgeries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/surgeries");
        setSurgeries(res.data);
        setFilteredSurgeries(res.data);
      } catch (err) {
        console.error("Error fetching surgeries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurgeries();
  }, []);

  useEffect(() => {
    const filtered = surgeries.filter((s) =>
      s.patientName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSurgeries(filtered);
  }, [search, surgeries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading surgeries...
      </div>
    );
  }

  return (
    <>
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Surgeries</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view surgery data for Desai Eye Hospital.
          </p>
        </div>
      </header>

      <section className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center flex-1 min-w-[200px] border border-gray-300 rounded-xl p-2 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by patient name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>

          {["All Months", "All Categories", "All Surgery Types"].map(
            (placeholder) => (
              <select
                key={placeholder}
                className="p-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 bg-white shadow-sm appearance-none cursor-pointer hover:border-indigo-500 transition-colors"
              >
                <option>{placeholder}</option>
              </select>
            )
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient Name</th>
                <th className="py-3 px-6">Surgery Type</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredSurgeries.length > 0 ? (
                filteredSurgeries.map((record) => (
                  <tr
                    key={record.id}
                    className="text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium">
                      {record.patientName}
                    </td>
                    <td className="py-4 px-6">{record.surgeryName}</td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(record.surgeryDate)
                        .toISOString()
                        .split("T")[0]}
                    </td>
                    <td className="py-4 px-6">
                      <CategoryPill category={record.surgeryType} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => navigate(`/surgery/${record.id}`)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No surgeries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default SurgeriesPage;
