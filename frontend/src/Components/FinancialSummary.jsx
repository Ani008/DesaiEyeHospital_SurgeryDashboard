import React, { useEffect, useState } from "react";
import axios from "axios";

const FinancialSummary = () => {
  const [financials, setFinancials] = useState({
    totalRevenue: 0,
    donorFunding: 0,
    subsidizedAmount: 0,
    selfPaidAmount: 0,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/surgeries");
        const surgeries = res.data;

        let donorFunding = 0;
        let subsidizedAmount = 0;
        let selfPaidAmount = 0;

        surgeries.forEach((s) => {
          donorFunding += s.donorAmount || 0;
          subsidizedAmount += s.hospitalAmount || 0;
          selfPaidAmount += s.patientAmount || 0;
        });

        const totalRevenue = donorFunding + subsidizedAmount + selfPaidAmount;

        setFinancials({
          totalRevenue,
          donorFunding,
          subsidizedAmount,
          selfPaidAmount,
        });
      } catch (err) {
        console.error("Error fetching financial data:", err);
      }
    };

    fetchFinancialData();
  }, []);

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Financial Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-gray-600">Total Revenue</span>
          <span className="text-base font-semibold text-indigo-600">
            {formatCurrency(financials.totalRevenue)}
          </span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-gray-600">Donor Funding</span>
          <span className="text-base font-semibold text-green-600">
            {formatCurrency(financials.donorFunding)}
          </span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-gray-600">Subsidized Amount</span>
          <span className="text-base font-semibold text-yellow-600">
            {formatCurrency(financials.subsidizedAmount)}
          </span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-gray-600">Self-Paid Amount</span>
          <span className="text-base font-semibold text-red-600">
            {formatCurrency(financials.selfPaidAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
