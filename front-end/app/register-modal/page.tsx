"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, Mail, Wallet, X, Sparkles, Shield, Loader, MapPin, Globe } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  walletAddress: string;
  username: string;
  location: string;
  country: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    walletAddress: "",
    username: "",
    location: "",
    country: "",
  });
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockWallet = "0x" + Math.random().toString(16).slice(2, 42);
      setFormData((prev) => ({ ...prev, walletAddress: mockWallet }));
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.walletAddress) newErrors.walletAddress = "Please connect your wallet";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        localStorage.setItem("userData", JSON.stringify(formData));
        onSubmit(formData);
        setFormData({
          fullName: "",
          email: "",
          walletAddress: "",
          username: "",
          location: "",
          country: "",
        });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl  my-auto rounded-3xl border border-cyan-500/30  shadow-2xl shadow-cyan-500/20  mx-auto"
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
                <motion.button
                onClick={onClose}
                className="absolute top-4 group right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
          

              <div className="relative z-10 p-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-left justify-start gap-5 mb-6 flex"
                >
                  <motion.div
                    
                    className="w-16 h-16  bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                 <div>
                     <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    Join ReTrust
                  </h2>
                  <p className="text-gray-400 text-sm">Provide your details to start trading securely</p>
                 </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-200" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.fullName ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                    </motion.div>

                    <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.email ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </motion.div>
                  </div>

                  <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        name="walletAddress"
                        value={formData.walletAddress}
                        readOnly
                        placeholder="Connect wallet to continue"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.walletAddress ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 cursor-not-allowed`}
                      />
                    </div>
                    {errors.walletAddress && (
                      <p className="text-red-400 text-xs mt-1">{errors.walletAddress}</p>
                    )}
                    <motion.button
                      type="button"
                      onClick={connectWallet}
                      disabled={isConnecting || formData.walletAddress !== ""}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full mt-2 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                        formData.walletAddress
                          ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50"
                      }`}
                    >
                      {isConnecting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          <span>Connecting...</span>
                        </>
                      ) : formData.walletAddress ? (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Wallet Connected</span>
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4" />
                          <span>Connect Wallet</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="johndoe"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.username ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                    </motion.div>

                    <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="New York, USA"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.location ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                    </motion.div>
                  </div>

                  <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="USA"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.country ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      />
                    </div>
                    {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader className="w-5 h-5" />
                        </motion.div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit Details"
                    )}
                  </motion.button>
                </form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-gray-400 text-xs mt-6"
                >
                  By submitting, you agree to our Terms & Conditions
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
