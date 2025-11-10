import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center justify-between px-12 py-5 bg-white/80 backdrop-blur-md border-b border-amber-100 fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text tracking-wide">
        Selefni
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-700 font-medium">
        <Link 
          to="/" 
          className="hover:text-amber-600 transition-all duration-300 hover:font-semibold"
        >
          Home
        </Link>
        <Link 
          to="/simulate" 
          className="hover:text-amber-600 transition-all duration-300 hover:font-semibold"
        >
          Simulate
        </Link>
        <Link 
          to="/apply/1" 
          className="hover:text-amber-600 transition-all duration-300 hover:font-semibold"
        >
          Apply
        </Link>
        <Link 
          to="/confirmation" 
          className="hover:text-amber-600 transition-all duration-300 hover:font-semibold"
        >
          Confirmation
        </Link>
      </div>

      {/* Button */}
      <div>
        <Link
          to="/admin/login"
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Admin Login
        </Link>
      </div>
    </nav>
  );
}