"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Feature", path: "/feature" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="text-2xl font-bold text-[#35579b]">
              Guardian
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {routes.map((route) => (
                <motion.div
                  key={route.name}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <Link
                    href={route.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === route.path
                        ? "text-[#35579b] bg-[#4B89BF]/10"
                        : "text-gray-600 hover:text-[#4B89BF]"
                    }`}
                  >
                    {route.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <motion.div
              className="ml-4 flex items-center md:ml-6"
              whileHover="hover"
              variants={linkVariants}
            >
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-[#35579b] hover:bg-[#4B89BF]/10"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="ml-3 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#35579b] hover:bg-[#4B89BF]"
              >
                Sign up
              </Link>
            </motion.div>
          </div>

          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#35579b] hover:text-[#4B89BF] hover:bg-[#4B89BF]/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === route.path
                      ? "text-[#35579b] bg-[#4B89BF]/10"
                      : "text-gray-600 hover:text-[#4B89BF] hover:bg-[#4B89BF]/10"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {route.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#35579b] hover:bg-[#4B89BF]/10"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#35579b] hover:bg-[#4B89BF]"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
