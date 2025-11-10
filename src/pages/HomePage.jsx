import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center text-center px-8">
      
      {/* Header Section */}
      <div className="max-w-3xl mb-16">
        <div className="mb-8">
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Find Your Perfect
            <span className="block text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
              Loan Match
            </span>
          </h1>
        </div>

        <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Smart loan simulations that help you make confident financial decisions. 
          Real numbers, real options—no guessing games.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            to="/simulate"
            className="bg-gradient-to-r from-orange-300 to-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            Start Simulation
          </Link>
          <Link
            to="/admin/login"
            className="bg-white text-gray-700 px-10 py-4 rounded-xl font-semibold border-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300"
          >
            Admin Portal
          </Link>
        </div>
      </div>

      
      {/* Features Grid */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gradient-to-br from-orange-300 to-amber-500 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
         
          <h3 className="text-xl font-bold mb-4">Precision Matching</h3>
          <p className="text-amber-100">
            Get loan recommendations tailored to your specific financial situation and goals.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          
          <h3 className="text-xl font-bold mb-4">Growth Focused</h3>
          <p className="text-emerald-100">
            Loans designed to help you grow—whether it's your business, home, or dreams.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-700 to-orange-500 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          
          <h3 className="text-xl font-bold mb-4">Secure & Safe</h3>
          <p className="text-blue-100">
            Your data is protected with bank-level security and privacy measures.
          </p>
        </div>
      </div>

      

    </div>
  );
}