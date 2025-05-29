import React, { useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActIndex from '../../store/Dashboard/Users/Act/ActIndex';

export default function Statistic() {
   const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const { data } = useSelector((state) => state.users);
  
const areaData = data?.reports_created_at_count.map((d) => ({
  week: d.date,
  methane: d.count,
})) || [];

const formattedPieData = ['#f97316' , '#dc2626', '#facc15' , '#0ea5e9' ]


const pieData = data?.location_danger_created_at_count.map((d , index) => ({
  name: d.date,
  value: d.count,
  color: formattedPieData[index],
}));
  return (
    <div className="statistics-dashboard">
      <div className="statistics-dashboard-header">
        <div>
          <h2>{t("Statistics")}</h2>
          <p className="subtitle-dashboard">{t("Mine safety analytics and trend")}s</p>
        </div>
      </div>

      <div className="statistics-dashboard-filters">
        <button className="active">{t("Weekly")}</button>
        <button>{t("Monthly")}</button>
        <button>{t("Yearly")}</button>
        <div className="statistics-dashboard-locations">
          {t("All Locations")} <ChevronDown size={16} />
        </div>
      </div>

      <div className="statistics-dashboard-charts">
        <div className="statistics-dashboard-card">
          <h3>{t("reports_created_at_count")}</h3>
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
          <h3>{t("location_danger_created_at_count")}</h3>
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
        <h3>{t("Safety Metrics Summary")}</h3>
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
