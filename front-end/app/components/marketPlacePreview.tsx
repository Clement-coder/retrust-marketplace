import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  condition: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: "0.45 ETH",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
    condition: "Like New",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: "1.2 ETH",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    condition: "Good",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    price: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    condition: "New",
  },
  {
    id: 4,
    name: "Canon EOS R6",
    price: "2.1 ETH",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    condition: "Like New",
  },
];

const MarketplacePreview: React.FC = () => {
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
            Trending <span className="text-gradient">Listings</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing deals on verified second-hand items
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.condition}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold hover:bg-white/20 transition-colors inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <TrendingUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplacePreview