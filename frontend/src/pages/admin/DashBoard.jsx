// pages/admin/Dashboard.jsx
import { Users, BookOpen, RepeatIcon } from "lucide-react";

const StatCard = ({ title, value, icon, color }) => (
  <div
    className={` text-white rounded-lg shadow-lg p-6 flex items-center ${color}`}
  >
    <div className={`mx-4`}>{icon}</div>
    <div className="ml-6">
      <p className="font-medium">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Tổng người dùng"
          value="120"
          icon={<Users size={30} className="text-white" />}
          color="bg-blue-700"
        />
        <StatCard
          title="Số sản phẩm"
          value="120"
          icon={<BookOpen size={30} className="text-white" />}
          color="bg-[#4017bb]"
        />
        <StatCard
          title="Số giao dịch"
          value="1,000"
          icon={<RepeatIcon size={30} className="text-white" />}
          color="bg-green-700"
        />
      </div>
    </div>
  );
};

export default Dashboard;
