import CategorySection from "./components/categorySection";
import CompaniesSection from "./components/CompaniesSection";
import FeaturedJobs from "./components/FeaturedJob";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import JobBanner from "./components/JobBanner";
import LatestJobs from "./components/LatestJob";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <Navbar />
          <HeroSection />
          <CompaniesSection />
          <CategorySection />
          <JobBanner />
          <FeaturedJobs />
          <LatestJobs />
          <Footer />
        </div>
      </main>
    </div>
  );
}
