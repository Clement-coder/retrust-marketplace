"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Wallet, User2, ShoppingCart, Package, ArrowRight, LogOut, UserPlus, ShieldAlert, AlertTriangle, X, Tag, Image as ImageIcon, DollarSign, Trash2, MessageSquare, MapPin, Loader, PlusCircle } from "lucide-react";
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

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  condition: number;
  price: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"marketplace" | "list-items">("marketplace");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [particlePositions, setParticlePositions] = useState<{ left: string; top: string; }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const positions = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticlePositions(positions);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleRegistration = (data: FormData) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setIsRegistrationModalOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    setIsLogoutModalOpen(false);
    setIsRegistrationModalOpen(true);
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    setIsAddItemModalOpen(false);
    setActiveTab("marketplace");
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete));
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const AuthRequired = ({ title, description }: { title: string, description: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center mt-10 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg shadow-cyan-500/10"
    >
      <div className="flex justify-center mb-4">
        <ShieldAlert className="w-16 h-16 text-cyan-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsRegistrationModalOpen(true)}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50"
      >
        Register Now
      </motion.button>
    </motion.div>
  );

  const LogoutModal = () => (
    <AnimatePresence>
      {isLogoutModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-8"
          >
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Are you sure?</h3>
            <p className="text-gray-400 text-center mb-6">You are about to be logged out.</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmLogout}
                className="px-6 py-2 rounded-full bg-red-500/80 text-white font-bold flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Yes, Log Out</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const DeleteModal = () => (
    <AnimatePresence>
      {isDeleteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-8"
          >
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Delete Item?</h3>
            <p className="text-gray-400 text-center mb-6">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDelete}
                className="px-6 py-2 rounded-full bg-red-500/80 text-white font-bold flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Yes, Delete</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );



  const AddItemModal = () => {
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      image: "",
      category: "",
      location: "",
      condition: 1,
      price: "",
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof formData]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };
  
    const handleConditionChange = (condition: number) => {
      setFormData((prev) => ({ ...prev, condition }));
    };
  
    const validateForm = () => {
      const newErrors: Partial<typeof formData> = {};
      if (!formData.name.trim()) newErrors.name = "Product name is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.image.trim()) newErrors.image = "Image URL is required";
      if (!formData.category.trim()) newErrors.category = "Category is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        newErrors.price = "A valid price is required";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        setIsSubmitting(true);
        setTimeout(() => {
          handleAddProduct(formData);
          setFormData({
            name: "",
            description: "",
            image: "",
            category: "",
            location: "",
            condition: 1,
            price: "",
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

    const conditionOptions = [
      { label: "New", value: 1 },
      { label: "Like New", value: 2 },
      { label: "Good", value: 3 },
      { label: "Fair", value: 4 },
      { label: "Used", value: 5 },
    ];
  
    return (
      <AnimatePresence>
        {isAddItemModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl  my-auto rounded-3xl border border-cyan-500/30  shadow-2xl shadow-cyan-500/20  mx-auto"
            >
              <motion.button
                onClick={() => setIsAddItemModalOpen(false)}
                className="absolute top-4 group right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <div className="relative z-10 p-8 max-h-[80vh] overflow-y-auto hide-scrollbar">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-left justify-start gap-5 mb-6 flex"
                >
                  <motion.div
                    className="w-16 h-16  bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
                  >
                    <Package className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                      List a New Product
                    </h2>
                    <p className="text-gray-400 text-sm">Fill out the details below to add your product to the marketplace.</p>
                  </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-200" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Vintage Leather Jacket"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.name ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </motion.div>

                  <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-5 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your product in detail..."
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.description ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      />
                    </div>
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                  </motion.div>

                  <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.png"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.image ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      />
                    </div>
                    {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="e.g., Apparel"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.category ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
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
                          placeholder="e.g., New York, USA"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                            errors.location ? "border-red-500/50" : "border-white/10"
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                        />
                      </div>
                      {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                    </motion.div>
                  </div>

                  <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
                    <div className="relative flex space-x-2">
                      {conditionOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleConditionChange(opt.value)}
                          className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                            formData.condition === opt.value
                              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div custom={6} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Price (in ETH)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.5"
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                          errors.price ? "border-red-500/50" : "border-white/10"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      />
                    </div>
                    {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
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
                        <span>Submitting Product...</span>
                      </>
                    ) : (
                      "List Product"
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const EmptyMarketplace = () => (
    <motion.div className="text-center mt-10 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg shadow-cyan-500/10">
        <div className="flex justify-center mb-4">
            <ShoppingCart className="w-16 h-16 text-cyan-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Marketplace is Empty</h3>
        <p className="text-gray-400 mb-6">Be the first to list an item and get it seen by the community.</p>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("list-items")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/50 flex items-center space-x-2 mx-auto"
        >
            <PlusCircle className="w-5 h-5" />
            <span>List Your First Item</span>
        </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <Navbar/>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{ left: pos.left, top: pos.top }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
          />
        ))}
      </motion.div>

      <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto  sm:mx-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-md mt-14 gap-2 flex items-center justify-between bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border  border-white/10  shadow-lg shadow-cyan-500/20"
          >
            Welcome, {userData ? userData.fullName.split(" ")[0] : "User"} 
            <span> &#128075; </span>!
            {userData ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className=" px-4 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 flex items-center space-x-2 mx-auto"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegistrationModalOpen(true)}
                className=" px-4 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 flex items-center space-x-2 mx-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </motion.button>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border  border-white/10 mt-8  shadow-lg shadow-cyan-500/20"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center space-x-2">
              <User2 className="w-6 h-6 text-cyan-400" />
              <span>Your Profile</span>
            </h2>
            {userData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex bg-white/10 border border-gray-300/20 py-4 px-4 rounded-2xl items-center space-x-3">
                  <User className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="font-medium">{userData.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 border border-gray-300/20 py-4 px-4 rounded-2xl space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 border border-gray-300/20 py-4 px-4 rounded-2xl space-x-3">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Wallet</p>
                    <p className="font-medium truncate max-w-[200px]">{userData.walletAddress}</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 border border-gray-300/20 py-4 px-4 rounded-2xl space-x-3">
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

          <div className="flex justify-center space-x-4 mt-10">
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

          <AnimatePresence mode="wait">
            {activeTab === "marketplace" ? (
              <motion.div
                key="marketplace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {userData ? (
                  <motion.div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg shadow-cyan-500/10 mt-10">
                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                          <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-800/50 rounded-xl border border-cyan-500/20 overflow-hidden shadow-lg shadow-cyan-500/10 group"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ objectFit: "cover" }}
                                className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {product.condition}
                              </div>
                              <motion.button
                                onClick={() => handleDelete(product.id)}
                                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ scale: 1.1, backgroundColor: '#ef4444' }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                              <p className="text-sm text-gray-400 mb-2">Listed by @{userData.username}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-cyan-400 font-bold text-xl">{product.price} ETH</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyMarketplace />
                    )}
                  </motion.div>
                ) : (
                  <AuthRequired title="Access Denied" description="Please register to view the marketplace." />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="list-items"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-10"
              >
                {userData ? (
                  <motion.div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg shadow-cyan-500/10">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">List Your Items</h2>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Sell your items securely on ReTrust. Click below to start listing.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAddItemModalOpen(true)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium flex items-center space-x-2 mx-auto"
                    >
                      <Package className="w-5 h-5" />
                      <span>List an Item</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <AuthRequired title="Action Required" description="Please register to list an item." />
                )}
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
      <LogoutModal />
      <AddItemModal />
      <DeleteModal />
    </div>
  );
};

const ListProductForm = ({ handleAddProduct }: { handleAddProduct: (product: Omit<Product, 'id'>) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    location: "",
    condition: 1,
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleConditionChange = (condition: number) => {
    setFormData((prev) => ({ ...prev, condition }));
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "A valid price is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        handleAddProduct(formData);
        setFormData({
          name: "",
          description: "",
          image: "",
          category: "",
          location: "",
          condition: 1,
          price: "",
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

  const conditionOptions = [
    { label: "New", value: 1 },
    { label: "Like New", value: 2 },
    { label: "Good", value: 3 },
    { label: "Fair", value: 4 },
    { label: "Used", value: 5 },
  ];

  return (
    <motion.div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg shadow-cyan-500/10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">List Your Items</h2>
      <p className="text-gray-300 mb-6 max-w-md mx-auto">
        Sell your items securely on ReTrust. Fill out the form below to start listing.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-200" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Vintage Leather Jacket"
                className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                  errors.name ? "border-red-500/50" : "border-white/10"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </motion.div>

          <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-5 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <textarea
                name="description"
                value={formData.description}
                // @ts-ignore
                onChange={handleInputChange}
                placeholder="Describe your product in detail..."
                rows={4}
                className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                  errors.description ? "border-red-500/50" : "border-white/10"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              />
            </div>
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </motion.div>

          <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
                className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                  errors.image ? "border-red-500/50" : "border-white/10"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              />
            </div>
            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Apparel"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                    errors.category ? "border-red-500/50" : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                />
              </div>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
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
                  placeholder="e.g., New York, USA"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                    errors.location ? "border-red-500/50" : "border-white/10"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                />
              </div>
              {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
            </motion.div>
          </div>

          <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
            <div className="relative flex space-x-2">
              {conditionOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleConditionChange(opt.value)}
                  className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                    formData.condition === opt.value
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div custom={6} variants={inputVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-gray-300 mb-2">Price (in ETH)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.5"
                className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg border ${
                  errors.price ? "border-red-500/50" : "border-white/10"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              />
            </div>
            {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
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
                <span>Submitting Product...</span>
              </>
            ) : (
              "List Product"
            )}
          </motion.button>
        </form>
    </motion.div>
  );
}

export default Dashboard;
