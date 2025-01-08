"use client";
import Image from "next/image";
import Link from "next/link";
import "../globals.css"; // Adjust the path if necessary

import { createIcons, icons } from "lucide-react";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar/NavBar";
import { Landmark, Bell, Wallet, NotebookPen, LineChart } from "lucide-react";

import monitor from "../../../public/stock.png";
import child from "../../../public/stock2.jpg";
import people from "../../../public/stock1.jpg";
import writing from "../../../public/stockImage1.jpg";

import phone from "../../../public/stock3.png";

export default function FeaturePageComponents() {
  const features = [
    {
      title: "Smart Financial Oversight",
      description:
        "Monitor real-time spending habits, receive personalized insights, and make smarter financial decisions with our advanced tracking capabilities.",
      image: monitor,
      icon: LineChart,
      iconAnimation: {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
    {
      title: "Kid-Friendly Savings Tools",
      description:
        "Kids can set savings goals, track their progress, and learn the value of money through interactive and engaging features designed specifically for them.",
      image: child,
      icon: Landmark,
      iconAnimation: {
        initial: { scale: 1 },
        animate: { scale: 1.2 },
        transition: { duration: 0.5, yoyo: Infinity },
      },
    },
    {
      title: "Real-Time Notifications",
      description:
        "Receive real-time balance updates for every transaction, ensuring you're always informed about your account activity.",
      image: people,
      icon: Bell,
      iconAnimation: {
        initial: { rotate: 0 },
        animate: { rotate: [0, 15, -15, 0] },
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
      },
    },
    {
      title: "Customizable Spending Categories",
      description:
        "Create and manage personalized spending categories, set budgets, and track your expenses with ease.",
      image: writing,
      icon: Wallet,
      iconAnimation: {
        initial: { y: 0 },
        animate: { y: [-5, 5, -5] },
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      title: "Financial Education Hub",
      description:
        "Age-appropriate lessons and interactive content teach kids about saving, investing, budgeting, and the basics of money management in a fun and accessible way.",
      image: phone,
      icon: NotebookPen,
      iconAnimation: {
        initial: { rotateY: 0 },
        animate: { rotateY: 180 },
        transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
      },
    },
  ];

  // Background animation variants
  const floatingShapes = [...Array(6)].map((_, i) => ({
    initial: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      rotate: 0,
      opacity: 0.3,
    },
    animate: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      rotate: 360,
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 20 + i * 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  }));

  return (
    <div className="min-h-screen bg-[#f8fcfd] relative overflow-hidden">
      <NavBar />

      {/* Animated background shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          initial={shape.initial}
          animate={shape.animate}
        >
          <div
            className={`
            ${i % 3 === 0 ? "w-16 h-16 rounded-full bg-[#4B89BF]/10" : ""}
            ${i % 3 === 1 ? "w-12 h-12 rounded bg-[#35579b]/10" : ""}
            ${i % 3 === 2 ? "w-8 h-8 text-[#4B89BF]/20 font-bold" : ""}
          `}
          >
            {i % 3 === 2 && "$"}
          </div>
        </motion.div>
      ))}

      <div className=" mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-[#35579b] mb-4">
            Our Features
          </h2>
          <p className="text-[#35579b]/70 max-w-2xl mx-auto">
            Discover the tools and features that make our banking platform
            unique and perfect for families.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full bg-white hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#35579b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute top-4 right-4 text-white"
                    initial={feature.iconAnimation.initial}
                    animate={feature.iconAnimation.animate}
                    transition={feature.iconAnimation.transition}
                  >
                    <feature.icon size={32} />
                  </motion.div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-semibold text-[#35579b] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#35579b]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={features[4].image}
                alt={features[4].title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#35579b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute top-4 right-4 text-white"
                initial={features[4].iconAnimation.initial}
                animate={features[4].iconAnimation.animate}
                transition={features[4].iconAnimation.transition}
              ></motion.div>
            </div>
            <div className="p-8 relative">
              <h3 className="text-2xl font-semibold text-[#35579b] mb-4">
                {features[4].title}
              </h3>
              <p className="text-[#35579b]/70 leading-relaxed text-lg">
                {features[4].description}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
