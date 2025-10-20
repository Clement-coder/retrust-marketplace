"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, type BaseError } from "wagmi";
import { useRouter } from "next/navigation";
import { retrustAbi } from "@/abi/retrustAbi";
import { Loader, User, Mail, Wallet, AtSign, MapPin, Flag, X, ShieldCheck, CheckCircle, XCircle } from "lucide-react";

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
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    walletAddress: "",
    username: "",
    location: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const router = useRouter();

  // 🔹 Auto-fill wallet when connected
  React.useEffect(() => {
    if (isConnected && address) {
      setFormData((prev) => ({ ...prev, walletAddress: address }));
    }
  }, [isConnected, address]);

  // 🔹 Navigate to dashboard on successful registration
  React.useEffect(() => {
    if (isConfirmed) {
      router.push('/dashboard');
    }
  }, [isConfirmed, router]);

  // 🔹 Input handler
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

  // 🔹 Form validation
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.walletAddress)
      newErrors.walletAddress = "Please connect your wallet";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle form submit (write to contract)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    writeContract({
      address: "0x79057749f5927d7417256161a29D722C83714F26",
      abi: retrustAbi,
      functionName: "registerUser",
      args: [
        formData.fullName,
        formData.username,
        formData.email,
        formData.location,
        formData.country,
      ],
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="relative z-10 p-8">
              <div className="text-left justify-start gap-5 mb-6 flex">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    Join ReTrust
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Provide your details to start trading securely
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <motion.div
                    custom={0}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.fullName
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    custom={1}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.email ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Wallet */}
                <motion.div
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Wallet Address
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-5 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="walletAddress"
                      value={formData.walletAddress}
                      readOnly
                      placeholder={
                        isConnected ? "Connected" : "Connect wallet to continue"
                      }
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                        errors.walletAddress
                          ? "border-red-500/50"
                          : "border-white/10"
                      } rounded-xl text-white placeholder-gray-500 cursor-not-allowed`}
                    />
                    <div className="mt-3">
                      <w3m-button />
                    </div>
                  </div>
                </motion.div>

                {/* Username + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    custom={3}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="johndoe"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.username
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    custom={4}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Jos, Nigeria"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                          errors.location
                            ? "border-red-500/50"
                            : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.location}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Country */}
                <motion.div
                  custom={5}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Nigeria"
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                        errors.country ? "border-red-500/50" : "border-white/10"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50`}
                    />
                  </div>
                  {errors.country && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.country}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all flex items-center justify-center space-x-2"
                >
                  {isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
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

              {/* ✅ TX STATUS */}
              {hash && (
                <div className="mt-3 text-sm text-gray-300 break-all text-center">
                  Tx Hash: {hash}
                </div>
              )}
              {isConfirming && (
                <div className="text-yellow-400 mt-2 flex items-center justify-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Waiting for confirmation...</span>
                </div>
              )}
              {isConfirmed && (
                <div className="text-green-400 mt-2 flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Registration successful!</span>
                </div>
              )}
              {error && (
                <div className="text-red-400 mt-2 flex items-center justify-center space-x-2">
                  <XCircle className="w-5 h-5" />
                  <span>Error: {(error as BaseError).shortMessage || error.message}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
