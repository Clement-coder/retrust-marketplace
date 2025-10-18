import React from "react";
import { motion } from "framer-motion";
import { Package, Wallet, UserCheck } from "lucide-react";

interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Package className="w-12 h-12" />,
    title: "Seller Lists Item",
    description: "Upload photos, set price, and create a blockchain-backed listing in minutes.",
  },
  {
    icon: <Wallet className="w-12 h-12" />,
    title: "Buyer Pays into Escrow",
    description: "Payment is secured in a smart contract, protecting both parties.",
  },
  {
    icon: <UserCheck className="w-12 h-12" />,
    title: "Funds Released After Delivery",
    description: "Once the buyer confirms receipt, funds are automatically released to seller.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to trade with complete confidence and security
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/50">
                  {index + 1}
                </div>

                <div className="mb-6 text-cyan-400 mt-4">{step.icon}</div>

                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks