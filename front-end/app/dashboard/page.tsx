"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Wallet, User2, ShoppingCart, Package, ArrowRight, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RegistrationModal from "../register-modal/page";
import Navbar from "../components/navbar";

interface UserData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
}

interface FormData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
}

const sampleProducts = [
  { id: 1, name: "iPhone 13 Pro", price: "0.45 ETH", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400", condition: "Like New" },
  { id: 2, name: "MacBook Air M2", price: "1.2 ETH", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", condition: "Good" },
  { id: 3, name: "Sony WH-1000XM4", price: "0.15 ETH", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400", condition: "New" },
];

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"marketplace" | "list-items">("marketplace");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      setIsRegistrationModalOpen(true);
    }
  }, []);

  const handleRegistration = (data: FormData) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setIsRegistrationModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    setIsRegistrationModalOpen(true);
  };

  const handleActionClick = (action: "marketplace" | "sell") => {
    if (!userData) {
      setIsRegistrationModalOpen(true);
    } else {
      router.push(action === "marketplace" ? "/marketplace" : "/sell");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <Navbar/>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
          />
        ))}
      </motion.div>

      {/* Dashboard Content */}
      <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold bg-white/5 backdrop-blur-lg border-white/20  rounded-2xl p-6 sm:p-8 border border-white/10mt-6  text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-8"
          >
            Welcome, {userData ? userData.fullName.split(" ")[0] : "User"}!
          </motion.h1>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border  border-white/10  shadow-lg shadow-cyan-500/20"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center space-x-2">
              <User2 className="w-6 h-6 text-cyan-400" />
              <span>Your Profile</span>
            </h2>
            {userData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="font-medium">{userData.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Wallet</p>
                    <p className="font-medium truncate max-w-[200px]">{userData.walletAddress}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User2 className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="font-medium">{userData.username}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center">Please register to view your profile.</p>
            )}
       
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("marketplace")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium flex items-center space-x-2 ${
                activeTab === "marketplace"
                  ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Marketplace</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("list-items")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium flex items-center space-x-2 ${
                activeTab === "list-items"
                  ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>List Items</span>
            </motion.button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "marketplace" ? (
              <motion.div
                key="marketplace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {sampleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(6, 182, 212, 0.3)" }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-cyan-400/50"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        
                        style={{ objectFit: "cover" }}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {product.condition}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base sm:text-lg">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-cyan-400 font-bold">{product.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleActionClick("marketplace")}
                          className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list-items"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4">List Your Items</h2>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Sell your items securely on ReTrust. Click below to start listing.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick("sell")}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium flex items-center space-x-2 mx-auto"
                >
                  <Package className="w-5 h-5" />
                  <span>List an Item</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={handleRegistration}
      />
    </div>
  );
};

export default Dashboard;