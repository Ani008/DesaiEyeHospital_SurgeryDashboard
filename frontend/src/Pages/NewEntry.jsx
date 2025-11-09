import React, { useState } from "react";

export default function NewEntry() {
  const [surgeryType, setSurgeryType] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    surgeryName: "",
    surgeryDate: new Date().toISOString().split("T")[0],
    donorName: "",
    donorAmount:"",
    hospitalAmount: "",
    patientAmount: "",
    totalAmount: "",
    notes: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object aligned with Prisma
    const dataToSend = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
      surgeryDate: new Date(formData.surgeryDate),
      surgeryType: surgeryType.toUpperCase(),
      donorName: surgeryType === "Funded" ? formData.donorName : null,
      donorAmount: surgeryType === "Funded" ? parseFloat(formData.donorAmount) || null : null,
      hospitalAmount: surgeryType === "Subsidized" ? parseFloat(formData.hospitalAmount) || null : null,
      patientAmount: surgeryType === "Subsidized" ? parseFloat(formData.patientAmount) || null : null,
      totalAmount: surgeryType === "Paid" ? parseFloat(formData.totalAmount) || null : null,
    };

    await fetch("http://localhost:5000/api/surgeries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    alert("✅ Surgery Record Inserted Successfully!");
  };

  // dynamic input fields
  const renderDynamicFields = () => {
    switch (surgeryType) {
      case "Funded":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Donor Name / Organization
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleChange}
                placeholder="e.g., Tata Foundation"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Donation Amount
              </label>
              <input
                type="number"
                name="donorAmount"
                value={formData.donorAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        );

      case "Subsidized":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Amount Paid by Hospital (Subsidy)
              </label>
              <input
                type="number"
                name="hospitalAmount"
                value={formData.hospitalAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Amount Paid by Patient
              </label>
              <input
                type="number"
                name="patientAmount"
                value={formData.patientAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        );

      case "Paid":
        return (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Total Amount Paid by Patient
            </label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">New Surgery Entry</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        {/* Surgery Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Surgery Name</label>
          <select
            name="surgeryName"
            value={formData.surgeryName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select surgery</option>
            <option>Cataract</option>
            <option>Cornea</option>
            <option>Glaucoma</option>
            <option>Lasik</option>
            <option>Orbit</option>
            <option>Paediatric</option>
            <option>Retina</option>
          </select>
        </div>

        {/* Surgery Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Surgery Date</label>
          <input
            type="date"
            name="surgeryDate"
            value={formData.surgeryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Surgery Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Surgery Type</label>
          <select
            name="surgeryType"
            value={surgeryType}
            onChange={(e) => setSurgeryType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select type</option>
            <option value="Funded">Funded</option>
            <option value="Subsidized">Subsidized</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {renderDynamicFields()}

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter notes (optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-full pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}
