import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import RequierBack from "../auth/RequierBack";
import RequierAuthPanel from "../auth/RequierAuthPanel";
import NotFound404 from "../components/NotFound404";

const Home = lazy(() => import("../pages/Home")),
  Main = lazy(() => import("../dashboard/pages/Main")),
  Main_app = lazy(() => import("../pages/Main")),
  Campaigns = lazy(() => import("../pages/CampaignsPage")),
  Home_dashboard = lazy(() => import("../dashboard/pages/Home")),
  Compaigns = lazy(() => import("../dashboard/pages/compaigns/Operation")),
  Locations = lazy(() => import("../dashboard/pages/locations/Operation")),
  Rewards = lazy(() => import("../dashboard/pages/rewards/Operation")),
  Statistic = lazy(() => import("../dashboard/pages/Statistic")),
  Education = lazy(() => import("../pages/EducationPage")),
  Report = lazy(() => import("../pages/ReportMinePage")),
  Profile = lazy(() => import("../pages/Profile")),
  DonateEquipment = lazy(() => import("../pages/DonateEquipment")),
  Report_dashboard = lazy(() => import("../dashboard/pages/reports/Operation")),
  Learns = lazy(() => import("../dashboard/pages/learns/Operation")),
    Organizations = lazy(() => import("../dashboard/pages/organizations/Operation")),
  Units = lazy(() => import("../dashboard/pages/units/Operation")),
  Tools = lazy(() => import("../dashboard/pages/tools/Operation")),
  Donations = lazy(() => import("../dashboard/pages/donations/Operation")),
  Steps = lazy(() => import("../dashboard/pages/steps/Operation")),
  Appointments = lazy(() =>
    import("../dashboard/pages/appointments/Operation")
  ),
  Teampositions = lazy(() =>
    import("../dashboard/pages/teampositions/Operation")
  ),
  Teams = lazy(() => import("../dashboard/pages/teams/Operation")),
  Memder = lazy(() => import("../dashboard/pages/memder/Operation")),
  Team = lazy(() => import("../pages/TeamManagement")),
  Register = lazy(() => import("../pages/RegisterForm")),
  CampaignDetails = lazy(() => import("../pages/CampaignDetails")),
  AlphaTeamPage = lazy(() => import("../pages/AlphaTeamPage")),
  TrainingArticlePage = lazy(() => import("../pages/TrainingArticlePage")),
  Login = lazy(() => import("../pages/LoginPage")),
  Interactive = lazy(() => import("../pages/InteractiveMapPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Main_app />
      </Suspense>
    ),
    errorElement: <NotFound404 />,
    children: [
      {
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <RequierBack />
          </Suspense>
        ),
        children: [
          {
            path: "/Register",
            element: (
              <>
                <Suspense fallback={<LoadingScreen />}>
                  <Register />
                </Suspense>
              </>
            ),
          },
          {
            path: "/Login",
            element: (
              <>
                <Suspense fallback={<LoadingScreen />}>
                  <Login />
                </Suspense>
              </>
            ),
          },
        ],
      },

      {
        path: "/",

        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Home />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Campaigns",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Campaigns />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Education",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Education />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Report",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Report />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Team",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Team />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Interactive/:search",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Interactive />
            </Suspense>
          </>
        ),
      },
      {
        path: "/Interactive",
        element: (
          <>
            <Suspense fallback={"loading..."}>
              <Interactive />
            </Suspense>
          </>
        ),
      },
      {
        path: "/CampaignDetails/:id",
        element: (
          <>
            <Suspense fallback={"loading..."}>
              <CampaignDetails />
            </Suspense>
          </>
        ),
      },
      {
        path: "/TeamDetails/:id",
        element: (
          <>
            <Suspense fallback={"loading..."}>
              <AlphaTeamPage />
            </Suspense>
          </>
        ),
      },
      {
        path: "/TrainingArticlePage/:id",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <TrainingArticlePage />
            </Suspense>
          </>
        ),
      },
      {
        path: "profile",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <Profile />
            </Suspense>
          </>
        ),
      },
      {
        path: "donate",
        element: (
          <>
            <Suspense fallback={<LoadingScreen />}>
              <DonateEquipment />
            </Suspense>
          </>
        ),
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Main />
      </Suspense>
    ),
    children: [
       {
        element: <RequierAuthPanel allowedRole={["admin" , 'member']} />,
        children: [
 {
            index: true,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Home_dashboard />
              </Suspense>
            ),
          },

          {
            path: "Statistic",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Statistic />
              </Suspense>
            ),
          },
        ]
      },
      {
        element: <RequierAuthPanel allowedRole={["admin"]} />,
        children: [
         
          {
            path: "compaigns",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Compaigns />
              </Suspense>
            ),
          },
          {
            path: "locations",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Locations />
              </Suspense>
            ),
          },
          {
            path: "rewards",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Rewards />
              </Suspense>
            ),
          },
          {
            path: "teams",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Teams />
              </Suspense>
            ),
          },
          {
            path: "steps",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Steps />
              </Suspense>
            ),
          },
          {
            path: "teampositions",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Teampositions />
              </Suspense>
            ),
          },
          {
            path: "report",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Report_dashboard />
              </Suspense>
            ),
          },
          {
            path: "learn",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Learns />
              </Suspense>
            ),
          },
          {
            path: "unit",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Units />
              </Suspense>
            ),
          },
          {
            path: "donation",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Donations />
              </Suspense>
            ),
          },
          {
            path: "appointments",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Appointments />
              </Suspense>
            ),
          },
          {
            path: "tools",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Tools />
              </Suspense>
            ),
          },
           {
            path: "organizations",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Organizations />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <RequierAuthPanel allowedRole={["member"]} />,
        children: [
          {
            path: "member",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Memder />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
