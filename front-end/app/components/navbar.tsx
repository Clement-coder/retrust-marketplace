"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
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
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/sell", label: "Sell" },
  { href: "/dashboard", label: "Dashboard" },
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
        <div className="flex items-center justify-between h-20 bg-black/30 backdrop-blur-lg rounded-full border border-white/10 my-4 px-8 shadow-lg shadow-cyan-500/10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
          >
            ReTrust
          </motion.div>

          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <motion.a
                  href={href}
                  whileHover={{ y: -2 }}
                  className="relative text-white hover:text-cyan-400 transition-colors group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRegistrationModalOpen(true)}
            className="hidden md:flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50"
          >
            <Wallet className="w-4 h-4" />
            <span>{userData ? `Hi, ${userData.fullName.split(" ")[0]}` : "Connect Wallet"}</span>
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6"
          >
            <ul className="space-y-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="block text-white hover:text-cyan-400 transition-colors p-3">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold"
            >
              <Wallet className="w-5 h-5" />
              <span>{userData ? `Hi, ${userData.fullName.split(" ")[0]}` : "Connect Wallet"}</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;