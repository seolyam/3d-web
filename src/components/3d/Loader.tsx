"use client";

import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading 3D Model...
      </motion.p>
    </div>
  );
}
