import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface CTAProps {
  handleActionClick: (action: "marketplace" | "sell") => void;
}

const CTA: React.FC<CTAProps> = ({ handleActionClick }) => {
  return (
    <section className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Start Trading <span className="text-gradient">Smart</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12">
            Join thousands of users already trading securely on ReTrust. Experience the future of peer-to-peer commerce today.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6, 182, 212, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleActionClick("marketplace")}
            className="px-12 py-6 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white text-xl font-bold shadow-2xl shadow-cyan-500/50 inline-flex items-center space-x-3"
          >
            <span>Get Started Now</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA