"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Menu, X, Home, Wrench, ShieldCheck, Store, LayoutDashboard, Box } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface UserData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
  password: string;
}

interface NavbarProps {
  userData: UserData | null;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

const navLinks: NavLink[] = [
    { href: "/#Home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/#how-it-works", label: "How it works", icon: <Wrench className="w-4 h-4" /> },
    { href: "/#why-retrust", label: "Why ReTrust", icon: <ShieldCheck className="w-4 h-4" /> },
    { href: "/#marketplace-preview", label: "Marketplace", icon: <Store className="w-4 h-4" /> },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
];

const Navbar: React.FC<NavbarProps> = ({ userData, setIsRegistrationModalOpen }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 bg-black/30 backdrop-blur-lg rounded-full border border-white/10 my-2 sm:my-4 px-4 sm:px-8 shadow-lg shadow-cyan-500/10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
          >
            ReTrust
          </motion.div>

          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <motion.a
                  href={href}
                  whileHover={{ y: -2 }}
                  className="relative text-white hover:text-cyan-400 transition-colors group flex items-center space-x-2"
                >
                  <motion.div whileHover={{ rotate: [0, 10, -10, 0], scale: 1.2 }}>{icon}</motion.div>
                  <span>{label}</span>
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </motion.a>
              </li>
            ))}
          </ul>

         <div className="items-center flex justify-center space-x-2 px-6 py-3 rounded-full bg-white/5 text-white font-bold">
              <Box className="w-5 h-5 text-cyan-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-300">web3 powered</span>
            </div>

          <motion.button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
            animate={isMobileMenuOpen ? "open" : "closed"}
          >
            <motion.div variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }} transition={{ duration: 0.2 }}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-2 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6"
            >
              <ul className="space-y-4">
                {navLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <a href={href} className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors p-3">
                      {icon}
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
