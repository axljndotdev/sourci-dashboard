import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "../styles.css";

const COLORS = ["#2BD1E0", "#FF66B2", "#000000"]; // Updated colors

const Dashboard = () => {
  const [data, setData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "dashboardData", "jEcqx3fjw441059I66ra");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 style={{ color: "rgb(255 136 191)" }}>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      {data ? (
        <div className="charts-container">
          <div className="chart-card">
            <h3 style={{ color: "#000000" }}>Suppliers Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Local", value: data.Suppliers?.local || 0 },
                    {
                      name: "International",
                      value: data.Suppliers?.international || 0,
                    },
                    { name: "Others", value: data.Suppliers?.others || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 style={{ color: "#000000" }}>Products Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.Products || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip cursor={{ fill: "rgba(75,192,192,0.2)" }} />
                <Bar
                  dataKey="count"
                  fill="#2BD1E0"
                  barSize={40}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 style={{ color: "#000000" }}>Client Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={data.Clients || []}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="new_clients"
                  stroke="#2BD1E0"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="loading-text" style={{ color: "#58C3CD" }}>
          Loading...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
