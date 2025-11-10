import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center justify-between px-12 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 tracking-wide">
        Selefni
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/simulate" className="hover:text-blue-600 transition">
          Simulate
        </Link>
        <Link to="/apply/1" className="hover:text-blue-600 transition">
          Apply
        </Link>
        <Link to="/confirmation" className="hover:text-blue-600 transition">
          Confirmation
        </Link>
      </div>

      {/* Button */}
      <div>
        <Link
          to="/admin/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Admin Login
        </Link>
      </div>
    </nav>
  );
}
