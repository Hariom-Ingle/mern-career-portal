import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { BarChart2, Users, Briefcase } from "lucide-react";

// Import chart.js elements
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import AdminCompaniesTable from "./AdminCompaniesTable";

// Register the elements you need
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { user } = useSelector((store) => store.auth);

  const pieData = {
    labels: ["Students", "Recruiters", "Jobs"],
    datasets: [
      {
        data: [250, 120, 300], // Sample statistics
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        hoverBackgroundColor: ["#45a049", "#0b7dda", "#ffca28"],
      },
    ],
  };

  const lineData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Job Applications",
        data: [10, 15, 8, 12, 20, 18, 25],
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.2,
      },
      {
        label: "Jobs Posted",
        data: [5, 9, 7, 10, 15, 13, 20],
        fill: false,
        borderColor: "#2196F3",
        tension: 0.2,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2 sm:p-5">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <nav className="md:w-1/4 bg-white h-full p-5 rounded-xl border border-gray-200 mb-5 md:mb-0">
            <div className="text-center my-3">
              <h1 className="text-lg font-bold text-black">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-row justify-between sm:flex-col gap-4 text-black">
              {["overview", "companies", "users", "jobs"].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer p-2 hover:bg-slate-100 font-semibold text-center rounded ${
                    selectedTab === tab ? "bg-slate-300" : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="md:w-3/4 px-1 sm:px-3 md:px-5  rounded-xl ml-0 md:ml-5 h-screen overflow-y-auto ">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xl">
              {selectedTab === "overview" && (
                <>
                  {/* Statistics Section */}
                  <h2 className="text-2xl font-bold mb-5">Overview</h2>
                  <div className="flex flex-wrap justify-around gap-5 mb-10">
                    <div className="flex flex-col items-center justify-center w-32 h-32 bg-green-100 p-5 rounded-lg shadow-md">
                      <Users className="text-green-600" size={40} />
                      <h3 className="text-lg font-semibold mt-2">Students</h3>
                      <p className="text-lg font-bold">250</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-32 h-32 bg-blue-100 p-5 rounded-lg shadow-md">
                      <Briefcase className="text-blue-600" size={40} />
                      <h3 className="text-lg font-semibold mt-2">Recruiters</h3>
                      <p className="text-lg font-bold">120</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-32 h-32 bg-yellow-100 p-5 rounded-lg shadow-md">
                      <BarChart2 className="text-yellow-600" size={40} />
                      <h3 className="text-lg font-semibold mt-2">Jobs</h3>
                      <p className="text-lg font-bold">300</p>
                    </div>
                  </div>

                  {/* Interactive Pie Chart */}
                  <div className="my-10">
                    <h2 className="text-xl font-bold mb-5">Statistics Chart</h2>

                    <div className="w-full   lg:w-1/2 mx-auto">
                      <Pie data={pieData} />
                    </div>
                  </div>

                  {/* Line Chart for Activity */}
                  <div className="my-10">
                    <h2 className="text-xl font-bold mb-5">
                      Weekly Job Activities
                    </h2>
                    <Line data={lineData} />
                  </div>
                </>
              )}

              {/* Manage Companies Section */}
              {selectedTab === "companies" && (
                <div>
                  <h2 className="text-2xl font-bold mb-5">
                    Pending Companies for Approval
                  </h2>
                  <AdminCompaniesTable />
                </div>
              )}

              {/* Manage Users Section */}
              {selectedTab === "users" && (
                <div>
                  <h2 className="text-2xl font-bold mb-5">Manage Users</h2>
                  <p>Here you can manage student and recruiter accounts.</p>
                </div>
              )}

              {/* Manage Jobs Section */}
              {selectedTab === "jobs" && (
                <div>
                  <h2 className="text-2xl font-bold mb-5">Manage Jobs</h2>
                  <p>Here you can review job postings and their statuses.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
