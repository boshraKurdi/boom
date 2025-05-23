import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import RequierBack from "../auth/RequierBack";


const Home = lazy(() => import("../pages/Home")),
  Main = lazy(() => import("../dashboard/pages/Main")),
  Campaigns = lazy(() => import("../pages/CampaignsPage")),
  Home_dashboard = lazy(() => import("../dashboard/pages/Home")),
  Compaigns = lazy(() => import("../dashboard/pages/compaigns/Operation")),
   Locations = lazy(() => import("../dashboard/pages/locations/Operation")),
    Rewards = lazy(() => import("../dashboard/pages/rewards/Operation")),
  Statistic = lazy(() => import("../dashboard/pages/Statistic")),
  Education = lazy(() => import("../pages/EducationPage")),
  Report = lazy(() => import("../pages/ReportMinePage")),
  Profile = lazy(() => import("../pages/Profile")) ,
  DonateEquipment = lazy(() => import("../pages/DonateEquipment")) ,
  Report_dashboard = lazy(() => import("../dashboard/pages/reports/Operation")),
  Learns = lazy(() => import("../dashboard/pages/learns/Operation")),
  Steps = lazy(() => import("../dashboard/pages/steps/Operation")),
  Teampositions = lazy(() => import("../dashboard/pages/teampositions/Operation")),
  Teams = lazy(() => import("../dashboard/pages/teams/Operation")),
  Team = lazy(() => import("../pages/TeamManagement")),
  Register = lazy(() => import("../pages/RegisterForm")),
  CampaignDetails = lazy(() => import("../pages/CampaignDetails")),
  AlphaTeamPage = lazy(() => import("../pages/AlphaTeamPage")),
  TrainingArticlePage = lazy(() => import("../pages/TrainingArticlePage")),
  Login = lazy(() => import("../pages/LoginPage")),
  Interactive = lazy(() => import("../pages/InteractiveMapPage"));
const router = createBrowserRouter([
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
            <Header />
            <Suspense fallback={<LoadingScreen />}>
              <Register />
            </Suspense>
            <Footer />
          </>
        ),
      },
      {
        path: "/Login",
        element: (
          <>
            <Header />
            <Suspense fallback={<LoadingScreen />}>
              <Login />
            </Suspense>
            <Footer />
          </>
        ),
      },
    ],
  },

  {
    path: "/",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/Campaigns",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Campaigns />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/Education",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Education />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/Report",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Report />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/Team",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Team />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/Interactive/:search",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Interactive />
        </Suspense>

        <Footer />
      </>
    ),
  },
  {
    path: "/Interactive",
    element: (
      <>
        <Header />
        <Suspense fallback={"loading..."}>
          <Interactive />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/CampaignDetails/:id",
    element: (
      <>
        <Header />
        <Suspense fallback={"loading..."}>
          <CampaignDetails />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/TeamDetails/:id",
    element: (
      <>
        <Header />
        <Suspense fallback={"loading..."}>
          <AlphaTeamPage />
        </Suspense>
        <Footer />
      </>
    ),
  },
  {
    path: "/TrainingArticlePage/:id",
    element: (
      <>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <TrainingArticlePage />
        </Suspense>
        <Footer />
      </>
    ),
  },
        {
        path: "profile",
        element: (
          <>
           <Header />
          <Suspense fallback={<LoadingScreen />}>
            <Profile />
          </Suspense>
           <Footer />
          </>
        ),
      },
       {
        path: "donate",
        element: (
          <>
           <Header />
          <Suspense fallback={<LoadingScreen />}>
            <DonateEquipment />
          </Suspense>
           <Footer />
          </>
        ),
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
