import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Logo from "../components/Logo";
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

const COLORS = ["#2BD1E0", "#FF66B2", "#000000", "#4CAF50", "#FFC107"]; // Extended colors for sales charts

const sampleSalesData = [
  { month: "Jan", sales: 4000, target: 3000 },
  { month: "Feb", sales: 3000, target: 3000 },
  { month: "Mar", sales: 5000, target: 3000 },
  { month: "Apr", sales: 2780, target: 3000 },
  { month: "May", sales: 1890, target: 3000 },
  { month: "Jun", sales: 2390, target: 3000 },
];

const salesByCategory = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 300 },
  { name: "Books", value: 200 },
];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".data-card, .chart-card").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

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
        <Logo />
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      <div className="matrix-grid">
        <div className="matrix-card">
          <h3>Industry Experience</h3>
          <p>30+ Years</p>
          <span>Combined sourcing expertise</span>
        </div>
        <div className="matrix-card">
          <h3>Quality Focus</h3>
          <p>100%</p>
          <span>Quality inspection standards</span>
        </div>
        <div className="matrix-card">
          <h3>Global Network</h3>
          <p>500+</p>
          <span>Verified manufacturers</span>
        </div>
        <div className="matrix-card">
          <h3>Success Rate</h3>
          <p>95%</p>
          <span>Client satisfaction</span>
        </div>
      </div>

      {data ? (
        <div className="charts-container">
          <div className="chart-card large">
            <h3 style={{ color: "#000000" }}>Monthly Sales Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2BD1E0"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#FF66B2"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card medium">
            <h3 style={{ color: "#000000" }}>Sales by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salesByCategory}
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
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

          <div className="chart-card small">
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
          Fetching Data...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
