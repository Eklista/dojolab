import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";

export const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};