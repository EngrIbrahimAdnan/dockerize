"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import routes from "@/app/constants/routes";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Generate random positions for floating coins only once
  const floatingCoins = useMemo(() => {
    return [...Array(5)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleNavigation = () => {
    router.push(routes.login); // Replace '/destination' with your route
  };

  return (
    <div className="min-h-screen bg-[#f8fcfd] overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-[#EAEFF6] -top-20 -left-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-[#4B89BF]/10 -bottom-10 -right-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-lg rotate-45 bg-[#35579b]/10 top-1/2 left-1/4"
          animate={{
            rotate: [45, 225, 45],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Floating coins */}
        {floatingCoins.map((position, i) => (
          <motion.div
            key={`coin-${i}`}
            className="absolute w-8 h-8 rounded-full bg-[#4B89BF]/30 flex items-center justify-center text-white text-xs font-bold"
            style={{
              top: position.top,
              left: position.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-label="Floating coin animation"
          >
            $
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <main className="mx-auto px-11 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#35579b] mb-6">
              Secure. Save.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#da51e6] to-[#3b73e4]">
                Grow!
              </span>
            </h1>
            <p className="text-lg text-[#35579b]/80 mb-8 leading-relaxed">
              Guardian is a family-focused money management app designed to
              empower kids with smart financial habits while giving parents full
              control and oversight.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#4B89BF] to-[#35579b] hover:opacity-90 transition-opacity"
                aria-label="Explore Guardian App"
                onClick={handleNavigation}
              >
                Explore
              </Button>
              <div className="inline-flex items-center space-x-2 text-[#35579b]/80 mt-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#EAEFF6] border-2 border-white flex items-center justify-center text-xs"
                    >
                      👤
                    </div>
                  ))}
                </div>
                <span>100K+ families trust Guardian</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#4B89BF]/10 to-[#35579b]/10 shadow-lg p-4">
              <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                <svg
                  className="w-1/2 h-1/2 text-[#4B89BF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            {/* Floating card decoration */}
            <motion.div
              className="absolute -top-6 -right-6 w-40 h-26 bg-white rounded-lg shadow-lg p-4"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {" "}
              <p>Sara almuti</p>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4B89BF] mb-2"></div>
                <div>
                  <p>great tool 😍😍 </p>
                </div>
                {/* <div className="w-3/4 h-2 rounded bg-[#EAEFF6]"></div> */}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
