import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const areaData = [
  { week: 'Week 1', methane: 40, dust: 30, structural: 20 },
  { week: 'Week 2', methane: 35, dust: 32, structural: 18 },
  { week: 'Week 3', methane: 60, dust: 35, structural: 15 },
  { week: 'Week 4', methane: 55, dust: 37, structural: 12 },
  { week: 'Week 5', methane: 70, dust: 38, structural: 18 },
  { week: 'Week 6', methane: 80, dust: 42, structural: 20 },
  { week: 'Week 7', methane: 65, dust: 45, structural: 25 }
];

const pieData = [
  { name: 'Gas Leaks', value: 40, color: '#f97316' },
  { name: 'Structural Damage', value: 25, color: '#dc2626' },
  { name: 'Methane Issues', value: 20, color: '#facc15' },
  { name: 'Water Ingress', value: 15, color: '#0ea5e9' }
];

export default function Statistic() {
  return (
    <div className="statistics-dashboard">
      <div className="statistics-dashboard-header">
        <div>
          <h2>Statistics</h2>
          <p className="subtitle-dashboard">Mine safety analytics and trends</p>
        </div>
      </div>

      <div className="statistics-dashboard-filters">
        <button className="active">Weekly</button>
        <button>Monthly</button>
        <button>Yearly</button>
        <div className="statistics-dashboard-locations">
          All Locations <ChevronDown size={16} />
        </div>
      </div>

      <div className="statistics-dashboard-charts">
        <div className="statistics-dashboard-card">
          <h3>Danger Level Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="methane" stackId="1" stroke="#f97316" fill="#f97316" />
              <Area type="monotone" dataKey="dust" stackId="1" stroke="#dc2626" fill="#dc2626" />
              <Area type="monotone" dataKey="structural" stackId="1" stroke="#facc15" fill="#facc15" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="statistics-dashboard-legend">
            <span style={{ color: '#f97316' }}>● Methane Levels</span>
            <span style={{ color: '#dc2626' }}>● Dust Concentration</span>
            <span style={{ color: '#facc15' }}>● Structural Issues</span>
          </div>
        </div>

        <div className="statistics-dashboard-card">
          <h3>Incident Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="statistics-dashboard-metrics">
        <h3>Safety Metrics Summary</h3>
        <div className='s-dashboard'>
        <div className="statistics-dashboard-metric">
          <p>Average Danger Level</p>
          <div className="statistics-dashboard-bar orange"><span style={{ width: '64%' }}></span></div>
          <p>64%</p>
        </div>
        <div className="statistics-dashboard-metric">
          <p>Incidents Resolved</p>
          <div className="statistics-dashboard-bar green"><span style={{ width: '82%' }}></span></div>
          <p>82%</p>
        </div>
        <div className="statistics-dashboard-metric">
          <p>Safety Protocol Adherence</p>
          <div className="statistics-dashboard-bar blue"><span style={{ width: '93%' }}></span></div>
          <p>93%</p>
        </div>
        </div>
      </div>
    </div>
  );
}
