import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturedVideos from './components/FeaturedVideos';
import FeaturedArticles from './components/FeaturedArticles';
import TopicsShowcase from './components/TopicsShowcase';
import NewsletterSection from './components/NewsletterSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedVideos />
      <FeaturedArticles />
      <TopicsShowcase />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default HomePage;