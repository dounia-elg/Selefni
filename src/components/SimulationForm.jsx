import { useState } from "react";

export default function SimulationForm() {
  
  const [creditType, setCreditType] = useState("");
  const [job, setJob] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [fixedFees, setFixedFees] = useState("");
  const [insurance, setInsurance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      creditType,
      job,
      amount,
      duration,
      annualRate,
      fixedFees,
      insurance,
    };
    
    console.log(formData);
    alert("Form submitted! Check console for data");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Loan Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credit Type</label>
          <select
            value={creditType}
            onChange={(e) => setCreditType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choose loan type</option>
            <option value="auto">Auto Loan</option>
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
            <option value="student">Student Loan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Enter your occupation"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter loan amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter number of months"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="Enter interest rate"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Fees (optional)</label>
          <input
            type="number"
            value={fixedFees}
            onChange={(e) => setFixedFees(e.target.value)}
            placeholder="Any extra fees"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance % (optional)</label>
          <input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="Insurance percentage"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-4"
        >
          Calculate My Loan
        </button>
      </form>
    </div>
  );
}