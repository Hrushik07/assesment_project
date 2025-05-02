import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const lineData = {
    labels: [
      "12th Oct",
      "13th Oct",
      "14th Oct",
      "15th Oct",
      "16th Oct",
      "17th Oct",
    ],
    datasets: [
      {
        label: "Margin %",
        data: [40, 50, 80, 60, 90, 70],
        borderColor: "#00ff99",
        backgroundColor: "rgba(3, 250, 151, 0.21)",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Remaining", "Consumed"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#007bff", "#ffc107"],
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.icon}>🏠</div>
        <div className={styles.icon}>⚙️</div>
      </aside>

      <header className={styles.dashboardHeader}>
        <h2>Analytics Dashboard</h2>
        <button className={styles.logoutButton} onClick={()=>navigate("/")}>Logout</button>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.card}>
          <h3>Inventory</h3>
          <p>93%</p>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        <div className={styles.card}>
          <h3>Orders</h3>
          <p>65%</p>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        <div className={styles.card}>
          <h3>Battery</h3>
          <p>65%</p>
          <Doughnut data={doughnutData} />
        </div>

        <div className={`${styles.card} ${styles.large}`}>
          <h3>Margin %</h3>
          <Line data={lineData} />
        </div>
      </div>

      <footer className={styles.dashboardFooter}>
        <p>© 2025, Greendzine Technologies Pvt. Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
