"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import glbl from "../../globals.css";
import {
  Copy,
  CheckCircle,
  ShoppingBag,
  Utensils,
  Plane,
  Car,
  CreditCard,
  Hotel,
  Gift,
  Music,
  Book,
  Coffee,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MainNav } from "@/components/main-nav";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activatedCodes, setActivatedCodes] = useState({});

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    // Simulating an API call to fetch promotions
    const fetchPromotions = async () => {
      const mockPromotions = [
        {
          id: "1",
          app: "Deliveroo",
          code: "MASTERCARD",
          description: "Get 20% off your next order with Mastercard",
          icon: Utensils,
        },
        {
          id: "2",
          app: "Shop",
          code: "WIN",
          description: "Win a $50 voucher on your next purchase",
          icon: ShoppingBag,
        },
        {
          id: "3",
          app: "TravelEase",
          code: "FLYNOW",
          description: "10% discount on flight bookings",
          icon: Plane,
        },
        {
          id: "4",
          app: "RideShare",
          code: "GUARDIANRIDE",
          description: "Get $5 off your next 3 rides",
          icon: Car,
        },
        {
          id: "5",
          app: "CreditBoost",
          code: "BOOST100",
          description:
            "Earn 100 bonus points on your next credit card purchase",
          icon: CreditCard,
        },
        {
          id: "6",
          app: "HotelHub",
          code: "STAYMORE",
          description: "15% off on bookings of 3 nights or more",
          icon: Hotel,
        },
        {
          id: "7",
          app: "GiftGalore",
          code: "SURPRISE20",
          description: "20% discount on gift cards",
          icon: Gift,
        },
        {
          id: "8",
          app: "MusicStream",
          code: "MELODY3",
          description: "3 months free premium subscription",
          icon: Music,
        },
        {
          id: "9",
          app: "BookWorm",
          code: "READMORE",
          description: "Buy 2 books, get 1 free",
          icon: Book,
        },
        {
          id: "10",
          app: "CafeRewards",
          code: "BREW2023",
          description: "Double points on all coffee purchases",
          icon: Coffee,
        },
      ];
      setPromotions(mockPromotions);
    };

    fetchPromotions();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const activateCode = (id) => {
    setActivatedCodes((prev) => ({ ...prev, [id]: true }));
  };

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.app.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="w-screen hidden md:block">
        {/* Header */}
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <SidebarTrigger />
            </div>
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <AppSidebar className="w-64 h-full border-r bg-gray-100" />
          <SidebarContent className="flex-1 overflow-visible">
            <motion.div
              className="max-w-6xl mx-auto space-y-8"
              initial="initial"
              animate="animate"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div variants={fadeInUp} className="text-center">
                <h1 className="text-4xl font-bold text-[#35579b]">
                  Exclusive Promotions
                </h1>
                <p className="mt-4 text-xl text-[#35579b]/70">
                  Enjoy special discounts with our partner apps
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="w-full max-w-md mx-auto"
              >
                <Input
                  type="text"
                  placeholder="Search promotions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-[#4B89BF] focus:outline-none focus:ring-2 focus:ring-[#35579b] focus:border-transparent"
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPromotions.map((promo) => (
                  <Card
                    key={promo.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
                  >
                    <CardHeader className="bg-[#4B89BF] text-white">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <promo.icon className="w-6 h-6" />
                          <span>{promo.app}</span>
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-[#35579b]/70 mb-4 h-12">
                        {promo.description}
                      </p>
                      {activatedCodes[promo.id] ? (
                        <div className="flex items-center justify-between bg-[#EAEFF6] p-3 rounded-md">
                          <span className="font-mono text-lg font-semibold text-[#35579b]">
                            {promo.code}
                          </span>
                          <Button
                            onClick={() => copyToClipboard(promo.code)}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 border-[#4B89BF] text-[#4B89BF] hover:bg-[#4B89BF] hover:text-white"
                          >
                            {copiedCode === promo.code ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => activateCode(promo.id)}
                          variant="default"
                          className="w-full bg-[#4B89BF] text-white hover:bg-[#35579b]"
                        >
                          Activate
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {filteredPromotions.length === 0 && (
                <motion.div
                  variants={fadeInUp}
                  className="text-center text-[#35579b]/70"
                >
                  No promotions found matching your search.
                </motion.div>
              )}

              <motion.div
                variants={fadeInUp}
                className="text-center text-sm text-[#35579b]/50"
              >
                <p>
                  Promotions are subject to terms and conditions. Offers may
                  change without notice.
                </p>
              </motion.div>
            </motion.div>
          </SidebarContent>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PromotionsPage;
