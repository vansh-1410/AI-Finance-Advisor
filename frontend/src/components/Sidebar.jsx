import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Finance Advisor</h2>
      <nav className="flex flex-col space-y-6 text-lg">
        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/investments" className="hover:text-blue-400">
          Investments
        </Link>
        <Link to="/profile" className="hover:text-blue-400">
          Profile
        </Link>
        <Link to="/settings" className="hover:text-blue-400">
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
