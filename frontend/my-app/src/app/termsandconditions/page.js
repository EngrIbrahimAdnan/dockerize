"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import glbl from "@/app/globals.css";

const TermsAndConditionsPage = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using the Guardian banking services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Description of Services",
      content:
        "Guardian provides various banking services including but not limited to account management, fund transfers, bill payments, and financial planning tools. We reserve the right to modify, suspend, or discontinue any part of our services at any time.",
    },
    {
      title: "3. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.",
    },
    {
      title: "4. Privacy Policy",
      content:
        "Your use of Guardian services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.",
    },
    {
      title: "5. Financial Transactions",
      content:
        "You are responsible for all transactions made through your account. We are not liable for any errors or losses incurred as a result of incorrect information provided by you or unauthorized access to your account.",
    },
    {
      title: "6. Intellectual Property",
      content:
        "All content, trademarks, and intellectual property on the Guardian platform are owned by Guardian. You may not use, reproduce, or distribute any content from our services without our explicit permission.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "Guardian is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services or any errors or omissions in the content of our platform.",
    },
    {
      title: "8. Governing Law",
      content:
        "These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Guardian operates, without regard to its conflict of law provisions.",
    },
    {
      title: "9. Changes to Terms",
      content:
        "We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes. Your continued use of Guardian services after such modifications constitutes your acceptance of the updated terms.",
    },
    {
      title: "10. Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at legal@guardian.com or through our customer support channels.",
    },
  ];

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fcfd] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
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
            Terms & Conditions
          </h1>
          <p className="mt-4 text-xl text-[#35579b]/70">
            Please read these terms carefully before using our services
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardHeader
                className="bg-[#4B89BF] text-white cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <CardTitle className="flex items-center justify-between">
                  <span>{section.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-[#35579b]/20"
                  >
                    {expandedSections[index] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              {expandedSections[index] && (
                <CardContent className="p-6">
                  <p className="text-[#35579b]/70">{section.content}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-center text-sm text-[#35579b]/50"
        >
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditionsPage;
