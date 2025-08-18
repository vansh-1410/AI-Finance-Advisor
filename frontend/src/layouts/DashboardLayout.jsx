import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-800 text-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
