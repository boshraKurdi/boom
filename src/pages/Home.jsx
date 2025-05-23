import CampaignHome from "../components/CampaignHome";
import EmergencyContact from "../components/EmergencyContact";
import HeroSection from "../components/HeroSection";
import MapSearch from "../components/MapSearch";
import Services from "../components/Services";
import TaskHome from "../components/TaskHome";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MapSearch />
      
      <TaskHome />
      <CampaignHome />
      <Services />
      <EmergencyContact />
    </>
  );
}
