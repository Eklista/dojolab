import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { Works } from "../components/sections/Works";

export const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Works />
      <Footer />
    </div>
  );
};