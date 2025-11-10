import { useState } from "react";

export default function SimulationForm() {
    const [creditType, setCreditType] = useState("");
    const [job, setJob] = useState("");
    const [amount, setAmount] = useState("");
    const [duration, setDuration] = useState("");
    const [annualRate, setAnnualRate] = useState("");
    const [fixedFees, setFixedFees] = useState("");
    const [insurance, setInsurance] = useState("");

    const [results, setResults] = useState(null);
    const [saving, setSaving] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);

    const toNumber = (v) => parseFloat(v) || 0;

    const fmt = (v) => `${Number(v).toFixed(2)} MAD`;

    const calculateMonthlyPayment = (amount, months, rate) => {
    const monthlyRate = (rate / 100) / 12;
    if (monthlyRate === 0) return amount / months;
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    };

    const calculateAPR = (amount, totalCost, months) => {
    const years = months / 12;
    return (Math.pow(totalCost / amount, 1 / years) - 1) * 100;
    };


    const buildAmortization = (amount, months, monthlyPayment, rate) => {
        const monthlyRate = rate / 100 / 12;
        let remaining = amount;
        const schedule = [];

        for (let month = 1; month <= months; month++) {
            const interest = remaining * monthlyRate;
            const principal = monthlyPayment - interest;
            remaining -= principal;

            schedule.push({
            month,
            interest: Number(interest.toFixed(2)),
            principal: Number(principal.toFixed(2)),
            remaining: Number(remaining.toFixed(2))
            });
        }

        return schedule;
    };

 const saveSimulation = async (simulation) => {
  setSaving(true);

  try {
    const response = await fetch('http://localhost:3000/simulations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulation),
    });

    if (response.ok) {
      console.log('Simulation saved to json-server');
    }
  } catch (error) {
    console.log('Using json-server backend');
  }

  setSaving(false);
};

  
    const handleSubmit = (e) => {
        e.preventDefault();

        const amountNum = toNumber(amount);
        const monthsNum = toNumber(duration);
        const rateNum = toNumber(annualRate);
        const feesNum = toNumber(fixedFees);
        const insuranceNum = toNumber(insurance);

    const monthly = calculateMonthlyPayment(amountNum, monthsNum, rateNum);
    const total = monthly * monthsNum + feesNum;
    const apr = calculateAPR(amountNum, total, monthsNum);
    const amortization = buildAmortization(amountNum, monthsNum, monthly, rateNum);

    setResults({
        monthlyPayment: monthly,
        totalCost: total,
        apr: apr,
        amortization: amortization
    });

    const simulation = {
        creditType,
        job,
        amount: amountNum,
        months: monthsNum,
        annualRate: rateNum,
        monthlyPayment: Number(monthly.toFixed(2)),
        totalCost: Number(total.toFixed(2)),
        apr: Number(apr.toFixed(2)),
        date: new Date().toISOString()
    };
    
    saveSimulation(simulation);
    };


  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
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
     
    {results && (
    <div className="mt-6 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-lg font-semibold mb-3">Simulation Results</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
            <div className="text-sm text-gray-600">Monthly Payment</div>
            <div className="font-bold text-blue-700">{fmt(results.monthlyPayment)}</div>
        </div>
        
        <div>
            <div className="text-sm text-gray-600">Total Cost</div>
            <div className="font-bold text-blue-700">{fmt(results.totalCost)}</div>
        </div>
        
        <div>
            <div className="text-sm text-gray-600">APR</div>
            <div className="font-bold">{results.apr.toFixed(2)}%</div>
        </div>
        
    <div>
    <div className="text-sm text-gray-600">Status</div>
    <div className="font-bold text-green-600">
        {saving ? 'Saving...' : 'Saved to server'}
    </div>
    </div>
        </div>

        <button
        onClick={() => setShowSchedule(!showSchedule)}
        className="w-full py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
        {showSchedule ? 'Hide' : 'Show'} Amortization Table
        </button>

        {showSchedule && (
        <div className="mt-4 overflow-auto max-h-64">
            <table className="w-full text-sm border">
            <thead className="bg-gray-100">
                <tr>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Interest</th>
                <th className="p-2 border">Principal</th>
                <th className="p-2 border">Remaining</th>
                </tr>
            </thead>
            <tbody>
                {results.amortization.map((row) => (
                <tr key={row.month}>
                    <td className="p-2 border text-center">{row.month}</td>
                    <td className="p-2 border text-right">{fmt(row.interest)}</td>
                    <td className="p-2 border text-right">{fmt(row.principal)}</td>
                    <td className="p-2 border text-right">{fmt(row.remaining)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </div>
    )}
        </div>
    );
    }