import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";

export const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
    </div>
  );
};