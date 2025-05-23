import   { AlertTriangle , ChartBar  ,MapPin, FileBarChart,Database} from 'lucide-react';
function Home() {
  return (
    <div className="dashboard">
      <h2>Safety Dashboard</h2>
      <p className="subtitle-dashboard">Real-time mine safety monitoring</p>

      <div className="stats-dashboard">
      <div className="stat-card-dashboard danger">
        <div className="icon"><AlertTriangle size={20} /></div>
        <div className="info">
          <h3>Active Alerts</h3>
          <p>24</p>
          <span className="down">↓ 12% vs yesterday</span>
        </div>
      </div>

      <div className="stat-card-dashboard default">
        <div className="icon"><MapPin size={20} /></div>
        <div className="info">
          <h3>Monitored Locations</h3>
          <p>42</p>
        </div>
      </div>

      <div className="stat-card-dashboard warning">
        <div className="icon"><FileBarChart size={20} /></div>
        <div className="info">
          <h3>Risk Assessment Score</h3>
          <p>64%</p>
          <span className="down">↓ 7% vs last week</span>
        </div>
      </div>

      <div className="stat-card-dashboard success">
        <div className="icon"><Database size={20} /></div>
        <div className="info">
          <h3>Total Operations</h3>
          <p>189</p>
          <span className="up">↑ 5% vs last week</span>
        </div>
      </div>
    </div>
  

      <div className="grid-dashboard">
        <div className="alerts-dashboard">
          <h3><AlertTriangle />Danger Alerts</h3>
           <p>danger prospecting system</p>
          <div className="alert-dashboard critical">
            <strong><AlertTriangle />Critical Danger</strong>
            <p>North Shaft - Level 3</p>
            <div className="bar" style={{ width: "92%" }}></div>
          </div>
          <div className="alert-dashboard high">
            <strong><AlertTriangle />High Danger</strong>
            <p>East Tunnel - Section B</p>
            <div className="bar" style={{ width: "78%" }}></div>
          </div>
        </div>

        <div className="activity-dashboard">
          <h3><ChartBar/>Recent Activity</h3>
           <p>danger prospecting system</p>
          <ul>
            <li>Gas level alert in Section C - <span>09:42 AM</span></li>
            <li>Structural inspection completed - <span>08:17 AM</span></li>
            <li>Ventilation system maintenance - <span>Yesterday</span></li>
            <li>Emergency drill conducted - <span>Yesterday</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;