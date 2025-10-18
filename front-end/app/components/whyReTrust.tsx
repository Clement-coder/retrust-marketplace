import React from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Globe } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Secure Escrow",
    description: "Your funds are locked in smart contracts until delivery is confirmed. No scams, no fraud.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "NFT Item Verification",
    description: "Every item gets a unique digital certificate proving authenticity and ownership history.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Complete Transparency",
    description: "All transactions are recorded on blockchain, creating an immutable trust layer.",
  },
];

const WhyReTrust: React.FC = () => {
  return (
    <section id="why-retrust" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">ReTrust</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built on blockchain technology for maximum security and transparency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-cyan-500/10 to-violet-500/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-cyan-500/50">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.3)",
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyReTrust;