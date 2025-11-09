import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SurgeryDetailsPage = () => {
  const { id } = useParams();
  const [surgery, setSurgery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurgery = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/surgeries/${id}`);
        setSurgery(res.data);
      } catch (err) {
        console.error("Error fetching surgery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurgery();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading details...
      </div>
    );
  }

  if (!surgery) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        No data found
      </div>
    );
  }

  // ✅ Calculate totalAmount dynamically if missing
  const donorAmount = Number(surgery.donorAmount) || 0;
  const hospitalAmount = Number(surgery.hospitalAmount) || 0;
  const patientAmount = Number(surgery.patientAmount) || 0;

  let totalAmount = Number(surgery.totalAmount) || 0;

  // Auto calculate if totalAmount not provided
  if (!totalAmount || totalAmount === 0) {
    if (surgery.surgeryType?.toUpperCase() === "FUNDED") {
      totalAmount = donorAmount + hospitalAmount + patientAmount;
    } else {
      totalAmount = hospitalAmount + patientAmount;
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (fixed) */}
      <aside className="w-64 bg-white shadow-lg p-6 fixed left-0 top-0 bottom-0">
        <h2 className="text-xl font-bold text-indigo-600 mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-100"
          >
            Dashboard
          </Link>
          <Link
            to="/surgeries"
            className="block px-3 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Surgeries
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Surgery Details
            </h1>
            <Link
              to="/surgeries"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              ← Back to Surgeries
            </Link>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            {/* Patient Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Patient Information
              </h3>
              <p><strong>Name:</strong> {surgery.patientName}</p>
              <p><strong>Age:</strong> {surgery.age}</p>
              <p><strong>Gender:</strong> {surgery.gender}</p>
            </div>

            {/* Surgery Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Surgery Information
              </h3>
              <p><strong>Surgery Name:</strong> {surgery.surgeryName}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(surgery.surgeryDate).toISOString().split("T")[0]}
              </p>
              <p><strong>Type:</strong> {surgery.surgeryType}</p>
            </div>

            {/* Donor Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Donor Information
              </h3>
              <p><strong>Donor Name:</strong> {surgery.donorName || "N/A"}</p>
              <p><strong>Donor Amount:</strong> ₹{donorAmount.toLocaleString()}</p>
            </div>

            {/* Financial Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Financial Details
              </h3>
              <p><strong>Hospital Amount:</strong> ₹{hospitalAmount.toLocaleString()}</p>
              <p><strong>Patient Amount:</strong> ₹{patientAmount.toLocaleString()}</p>
              <p className="text-indigo-700 font-semibold mt-1">
                <strong>Total Amount:</strong> ₹{totalAmount.toLocaleString()}
              </p>
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                {surgery.notes || "No additional notes."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SurgeryDetailsPage;
