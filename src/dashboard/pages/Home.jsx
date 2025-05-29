import {
  AlertTriangle,
  ChartBar,
  MapPin,
  FileBarChart,
  Database,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActIndex from "../../store/Dashboard/Users/Act/ActIndex";
import { useTranslation } from "react-i18next";
function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const { data } = useSelector((state) => state.users);
  return (
    <div className="dashboard">
      <h2>{t("Safety Dashboard")}</h2>
      <p className="subtitle-dashboard">
        {t("Real-time mine safety monitoring")}
      </p>

      <div className="stats-dashboard">
        <div className="stat-card-dashboard danger">
          <div className="icon">
            <AlertTriangle size={20} />
          </div>
          <div className="info">
            <h3>{t("users count")}</h3>
            <p>{data?.users_count}</p>
            {/* <span className="down">↓ 12% vs yesterday</span> */}
          </div>
        </div>

        <div className="stat-card-dashboard default">
          <div className="icon">
            <MapPin size={20} />
          </div>
          <div className="info">
            <h3>{t("report count")}</h3>
            <p>{data?.report_count}</p>
          </div>
        </div>

        <div className="stat-card-dashboard warning">
          <div className="icon">
            <FileBarChart size={20} />
          </div>
          <div className="info">
            <h3>{t("teams count")}</h3>
            <p>{data?.teams_count}</p>
            {/* <span className="down">↓ 7% vs last week</span> */}
          </div>
        </div>

        <div className="stat-card-dashboard success">
          <div className="icon">
            <Database size={20} />
          </div>
          <div className="info">
            <h3>{t("organizations count")}</h3>
            <p>{data?.organizations_count}</p>
            {/* <span className="up">↑ 5% vs last week</span> */}
          </div>
        </div>
      </div>

      <div className="grid-dashboard">
        <div className="alerts-dashboard">
          <h3>
            <AlertTriangle />
            {t("Danger Alerts")}
          </h3>
          <p>{t("danger prospecting system")}</p>
          {data?.latest_danger_report?.map((d) => {
            return (
              <div className="alert-dashboard critical">
                <strong>
                  <AlertTriangle />
                  {d?.name}
                </strong>
                <p>{d?.status}</p>
                <div className="bar" style={{ width: "92%" }}></div>
              </div>
            );
          })}

          {/* <div className="alert-dashboard high">
            <strong><AlertTriangle />High Danger</strong>
            <p>East Tunnel - Section B</p>
            <div className="bar" style={{ width: "78%" }}></div>
          </div> */}
        </div>

        <div className="activity-dashboard">
          <h3>
            <ChartBar />
            {t("Recent Activity")}
          </h3>
          <p>{t("danger prospecting system")}</p>
          <ul>
           
            <li>
              {t("teams_waiting_count")} - <span>{data?.teams_waiting_count}</span>
            </li>
            <li>
              {t("teams_available_count")} - <span>{data?.teams_available_count}</span>
            </li>
            <li>
              {t("teams_busy_count")} - <span>{data?.teams_busy_count}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
