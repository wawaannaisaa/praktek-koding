import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // ⏱️ lebih smooth

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🌸 LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white"
          >
            {/* BLUR CIRCLE BACKGROUND */}
            <div className="absolute w-72 h-72 bg-pink-300/30 rounded-full blur-3xl top-10 left-10" />
            <div className="absolute w-72 h-72 bg-purple-300/30 rounded-full blur-3xl bottom-10 right-10" />

            {/* CONTENT */}
            <div className="relative text-center space-y-6 p-8 rounded-2xl backdrop-blur-xl bg-white/40 shadow-xl">

              {/* ICON FLOAT */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl"
              >
                🌸
              </motion.div>

              {/* TEXT */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-semibold text-gray-700"
              >
                Loading Wawa portfolio's...
              </motion.h1>

              {/* LOADING BAR */}
              <div className="w-52 h-2 bg-pink-100 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="w-1/2 h-full bg-gradient-to-r from-pink-400 to-purple-400"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 MAIN APP */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </motion.div>
      )}
    </>
  );
};

export default App;