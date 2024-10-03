import Footer from "../miscellaneous/footer/Footer";
import NextNProgress from "@/progressbar/NextNProgress";
import SideMenuBar from "../miscellaneous/SideMenuBar";
import LeadModel from "../miscellaneous/LeadModel";
import AvailableCheck from "../miscellaneous/AvailableCheck";
import ScrollToTopButton from "./ScrollToTop";
import SideSearchMenuBar from "../miscellaneous/SideSearchMenuBar";
import PhoneNav from "../miscellaneous/PhoneNav";
import { useRouter } from 'next/router'; // Import useRouter

export default function Layout(props) {
  const router = useRouter(); // Initialize the useRouter hook
  const hideFooterRoutes = ['/makeup-artists']; // Routes where the footer should be hidden

  return (
    <>
      {/* <ShareModel/> */}
      <LeadModel />    
      <AvailableCheck />    
      <NextNProgress color="var(--secoundary-color)" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
      <SideMenuBar />
      <SideSearchMenuBar />
      {props.children}
      {router.pathname !== hideFooterRoutes[0] && <Footer />}
      <ScrollToTopButton />
      <PhoneNav />
    </>
  );
}
