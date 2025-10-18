import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Shield, Package, ArrowRight } from "lucide-react";

interface UserData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
  password: string;
}

interface HeroProps {
  userData: UserData | null;
  handleActionClick: (action: "marketplace" | "sell") => void;
}

const Hero: React.FC<HeroProps> = ({ userData, handleActionClick }) => {
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Trade second-hand items with{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                trust
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              ReTrust connects buyers and sellers using smart contracts, ensuring transparency, authenticity, and zero fraud. Experience the future of peer-to-peer commerce.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionClick("marketplace")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50 flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Explore Marketplace</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionClick("sell")}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <Package className="w-5 h-5" />
                <span>List an Item</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div>
                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-400">$2M+</div>
                <div className="text-gray-400">In Transactions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">99%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative z-10"
            >
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600"
                  alt="Digital Trading"
                  
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                    <Shield className="w-12 h-12 text-cyan-400" />
                    <div>
                      <div className="font-bold text-lg">100% Secure</div>
                      <div className="text-gray-300 text-sm">Protected by blockchain</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;