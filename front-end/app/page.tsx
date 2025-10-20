"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/Howitworks";
import WhyReTrust from "./components/whyReTrust";
import MarketplacePreview from "./components/marketPlacePreview";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import RegistrationModal from "./register-modal/page";
import ClientSideBubbles from "./components/ClientSideBubbles";

interface FormData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
  location: string;
  country: string;
}

interface UserData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
  location: string;
  country: string;
}

const ReTrustHomePage: React.FC = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleActionClick = (action: "marketplace" | "sell") => {
    if (!userData) {
      setIsRegistrationModalOpen(true);
    } else {
      router.push(action === "marketplace" ? "/marketplace" : "/sell");
    }
  };

  const handleRegistration = (data: FormData) => {
    setUserData(data);
    setIsRegistrationModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMTIgMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY86LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiMwZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-20"
        />
        <ClientSideBubbles />
      </div>

      <Navbar userData={userData} setIsRegistrationModalOpen={setIsRegistrationModalOpen} />
      <Hero userData={userData} handleActionClick={handleActionClick} />
      <HowItWorks />
      <WhyReTrust />
      <MarketplacePreview />
      <CTA handleActionClick={handleActionClick} />
      <Footer />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={handleRegistration}
        
      />
    </div>
  );
};

export default ReTrustHomePage;