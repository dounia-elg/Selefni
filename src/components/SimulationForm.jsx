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
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center">
                    <div className="w-16 h-1 bg-white/50 mx-auto mb-4 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-white mb-2">Loan Simulation</h1>
                    <p className="text-amber-100">Get accurate loan estimates in seconds</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Type</label>
                            <select
                                value={creditType}
                                onChange={(e) => setCreditType(e.target.value)}
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                            <input
                                type="text"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                placeholder="Enter your occupation"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (MAD)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter loan amount"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (months)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Enter number of months"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                            <input
                                type="number"
                                value={annualRate}
                                onChange={(e) => setAnnualRate(e.target.value)}
                                placeholder="Enter interest rate"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Fees (optional)</label>
                            <input
                                type="number"
                                value={fixedFees}
                                onChange={(e) => setFixedFees(e.target.value)}
                                placeholder="Any extra fees"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance % (optional)</label>
                            <input
                                type="number"
                                value={insurance}
                                onChange={(e) => setInsurance(e.target.value)}
                                placeholder="Insurance percentage"
                                className="w-full p-4 border-2 border-amber-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg"
                    >
                        Calculate My Loan
                    </button>
                </form>

                {results && (
                    <div className="p-8 border-t border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 m-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Simulation Results</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white/80 p-4 rounded-xl text-center shadow-sm">
                                <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                                <div className="text-xl font-bold text-amber-600">{fmt(results.monthlyPayment)}</div>
                            </div>
                            
                            <div className="bg-white/80 p-4 rounded-xl text-center shadow-sm">
                                <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                                <div className="text-xl font-bold text-orange-600">{fmt(results.totalCost)}</div>
                            </div>
                            
                            <div className="bg-white/80 p-4 rounded-xl text-center shadow-sm">
                                <div className="text-sm text-gray-600 mb-1">APR</div>
                                <div className="text-xl font-bold text-amber-700">{results.apr.toFixed(2)}%</div>
                            </div>
                            
                            <div className="bg-white/80 p-4 rounded-xl text-center shadow-sm">
                                <div className="text-sm text-gray-600 mb-1">Status</div>
                                <div className={`text-xl font-bold ${saving ? 'text-amber-600' : 'text-green-600'}`}>
                                    {saving ? 'Saving...' : 'Saved'}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowSchedule(!showSchedule)}
                            className="w-full py-3 bg-white border-2 border-amber-200 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                        >
                            {showSchedule ? 'Hide' : 'Show'} Amortization Table
                        </button>

                        {showSchedule && (
                            <div className="mt-6 overflow-auto max-h-96 bg-white/80 rounded-xl shadow-inner">
                                <table className="w-full text-sm">
                                    <thead className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                        <tr>
                                            <th className="p-3 text-left">Month</th>
                                            <th className="p-3 text-right">Interest</th>
                                            <th className="p-3 text-right">Principal</th>
                                            <th className="p-3 text-right">Remaining</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.amortization.map((row) => (
                                            <tr key={row.month} className="border-b border-amber-100 hover:bg-amber-50">
                                                <td className="p-3 text-gray-700">{row.month}</td>
                                                <td className="p-3 text-right text-red-500">{fmt(row.interest)}</td>
                                                <td className="p-3 text-right text-green-500">{fmt(row.principal)}</td>
                                                <td className="p-3 text-right text-gray-600">{fmt(row.remaining)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}