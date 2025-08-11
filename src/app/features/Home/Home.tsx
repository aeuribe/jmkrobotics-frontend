import Header from "@/app/components/header/Header";

import React from "react";
import HeroSection from "./components/HeroSection";
import ProductSection from "./components/ProductSection";
import Footer from "@/app/components/footer/Footer";

const Home = () => {
  return (
    <div className="bg-[#020C18]">
      <Header />
      <HeroSection />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default Home;