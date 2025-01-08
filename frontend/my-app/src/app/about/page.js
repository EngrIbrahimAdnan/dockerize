"use client";

import "../globals.css"; // Adjust the path if necessary

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Link from "next/link";
import NavBar from "../components/NavBar/NavBar";

import ImageIbrahim from "../../../public/ibrahim.jpg";
import ImageAbdulrahman from "../../../public/abdulrahman.jpg";
import ImageFajri from "../../../public/Fajri.jpg";
import ImageAbdullah from "../../../public/abdullah.jpg";

import monitor from "../../../public/stock.png";
import people from "../../../public/stock1.jpg";
import writing from "../../../public/stockImage1.jpg";

import phone from "../../../public/stock3.png";

export default function about() {
  const developers = [
    {
      name: "Abdulrahman Alfahad",
      image: ImageAbdulrahman,
      link: "https://www.linkedin.com/in/abdullah-alhumaidhan-2b0221233/",
    },
    {
      name: "Abdullah Alhumaidhan",
      image: ImageAbdullah,
      link: "https://www.linkedin.com/in/abdulrahman-alfahad-941411332/",
    },
    {
      name: "Fajri Alhusaini",
      image: ImageFajri,
      link: "https://www.linkedin.com/in/fajri-a-f-b240b8233/",
    },
    {
      name: "Ibrahim Alibrahim",
      image: ImageIbrahim,
      link: "https://www.linkedin.com/in/iaai/",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-[#f8fcfd] to-white">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <motion.div
            className="space-y-24"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-[#35579b]">
                About Us
              </h1>
              <div className="relative">
                <div className="flex justify-center">
                  <div className="relative w-2/3 h-64 overflow-hidden rounded-2xl shadow-lg group">
                    <Image
                      src={monitor}
                      alt="About Header"
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#35579b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-4 w-1/3 h-48 overflow-hidden rounded-2xl shadow-lg group">
                  <Image
                    src={phone}
                    alt="Nested Image"
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#35579b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>

            {/* Our Story */}
            <motion.div variants={fadeInUp} className="space-y-8 mt-16">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-[#35579b] mb-4">
                  Our Story
                </h2>
                <p className="text-[#35579b]/70 leading-relaxed">
                  At Guardian, we pioneered the vision of making family
                  financial management a collaborative journey. Inspired by the
                  challenges modern parents face in teaching financial
                  responsibility, we&apos;ve created intuitive tools that make
                  financial education engaging and effective for all ages.
                </p>
              </div>
              <div className="relative">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src={people}
                    alt="Our Story"
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#35579b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 bg-white hover:bg-[#4B89BF] transition-colors duration-300"></Button> */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>

            {/* Design Process */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold text-[#35579b]">
                    Step-by-Step Design Process for Guardian
                  </h2>
                  <div className="bg-[#EAEFF6] p-6 rounded-xl border-l-4 border-[#4B89BF]">
                    <p className="text-[#35579b]/70 leading-relaxed">
                      Our design process begins with extensive research into
                      family financial dynamics. We collaborate closely with
                      parents and financial experts to create intuitive
                      interfaces that make money management accessible and
                      engaging for all ages. This iterative process ensures that
                      Guardian meets the evolving needs of modern families.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 relative">
                  <div className="relative h-40 rounded-xl overflow-hidden shadow-md group">
                    <Image
                      src={writing}
                      alt="Design Process 1"
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#35579b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Designer Section */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h2 className="text-2xl font-bold text-[#35579b] text-center">
                Designer at Darling
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {developers.map((designer, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 },
                      },
                    }}
                  >
                    <Link href={designer.link}>
                      <Card className="overflow-hidden group">
                        <div className="relative aspect-square">
                          <Image
                            src={designer.image}
                            alt={designer.name}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#35579b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {designer.icon}
                          </div>
                          <div className="absolute bottom-4 right-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {designer.overlayIcon}
                          </div>
                        </div>
                        <div className="p-4 bg-[#EAEFF6] group-hover:bg-[#35579b] transition-colors duration-300">
                          <p className="text-[#35579b] group-hover:text-white font-medium text-center flex items-center justify-center gap-2">
                            {designer.name}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
