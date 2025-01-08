"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import glbl from "@/app/globals.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainNav } from "@/components/main-nav";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar";

const PrivacyPolicy = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const policies = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, email address, and financial data to provide our banking services. We also gather data on how you use our application to improve our offerings.",
      icon: Eye,
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to manage your account, process transactions, and provide customer support. We may also use it for marketing purposes, but only with your explicit consent.",
      icon: FileText,
    },
    {
      title: "Data Security",
      content:
        "We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. This includes encryption, secure servers, and regular security audits.",
      icon: Lock,
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time. Contact our support team for any data-related requests.",
      icon: Shield,
    },
  ];

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
            {/* Main Content */}
            <div className="min-h-screen bg-gradient-to-b from-[#f8fcfd] to-white py-16 px-4 sm:px-6 lg:px-8">
              <motion.div
                className="max-w-3xl mx-auto space-y-8"
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
                    Privacy Policy
                  </h1>
                  <p className="mt-4 text-xl text-[#35579b]/70">
                    Your privacy is important to us. This policy outlines how we
                    handle your data.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-[#35579b]">
                        Our Commitment to Privacy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#35579b]/70">
                      At Guardian, we are committed to protecting your privacy
                      and ensuring the security of your personal information.
                      This privacy policy explains how we collect, use, and
                      safeguard your data when you use our banking services.
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Accordion type="single" collapsible className="w-full">
                    {policies.map((policy, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-[#35579b] hover:text-[#4B89BF]">
                          <div className="flex items-center space-x-2">
                            <policy.icon className="w-5 h-5" />
                            <span>{policy.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-[#35579b]/70">
                          {policy.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-[#35579b]">
                        Contact Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[#35579b]/70">
                      If you have any questions about our privacy policy or how
                      we handle your data, please don't hesitate to contact us
                      at privacy@guardian.com or through our customer support
                      channels.
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="text-center text-sm text-[#35579b]/50"
                >
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>
              </motion.div>
            </div>
          </SidebarContent>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PrivacyPolicy;
