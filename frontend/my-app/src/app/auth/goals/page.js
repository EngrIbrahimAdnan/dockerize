"use client";

import { useState } from "react";
import glbl from "@/app/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  DollarSign,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar";

const FinancialGoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 5000,
      deadline: "2023-12-31",
      description: "Build a safety net for unexpected expenses.",
    },
    {
      id: 2,
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 15000,
      deadline: "2024-06-30",
      description: "Save for a reliable and fuel-efficient vehicle.",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    description: "",
  });

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0 && newGoal.deadline) {
      setGoals([...goals, { ...newGoal, id: Date.now() }]);
      setNewGoal({
        name: "",
        targetAmount: 0,
        currentAmount: 0,
        deadline: "",
        description: "",
      });
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <SidebarProvider>
      <div className="w-screen hidden md:block">
        {/* Header */}
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
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
            <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
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
                {/* Header Section */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl font-bold text-[#35579b]">
                    Financial Goals
                  </h1>
                  <p className="mt-4 text-xl text-[#35579b]/70">
                    Set, track, and achieve your financial aspirations
                  </p>
                </motion.div>

                {/* Add New Goal */}
                <motion.div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#4B89BF] hover:bg-[#35579b]">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Financial Goal</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={newGoal.name}
                            onChange={(e) =>
                              setNewGoal({ ...newGoal, name: e.target.value })
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={addGoal}
                        className="w-full bg-[#4B89BF] hover:bg-[#35579b]"
                      >
                        Add Goal
                      </Button>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Goals List */}
                <motion.div className="space-y-6">
                  <AnimatePresence>
                    {goals.map((goal) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Accordion type="single" collapsible>
                          <AccordionItem value={`goal-${goal.id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                              <CardHeader className="bg-[#4B89BF] text-white">
                                <AccordionTrigger>
                                  <CardTitle className="flex justify-between items-center">
                                    <span>{goal.name}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteGoal(goal.id);
                                      }}
                                      className="text-white hover:bg-[#35579b]/20"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </CardTitle>
                                </AccordionTrigger>
                              </CardHeader>
                              <AccordionContent>
                                <CardContent>
                                  <div className="flex justify-between items-center">
                                    <span>Target Amount:</span>
                                    <span>
                                      {formatCurrency(goal.targetAmount)}
                                    </span>
                                  </div>
                                </CardContent>
                              </AccordionContent>
                            </Card>
                          </AccordionItem>
                        </Accordion>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>
          </SidebarContent>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FinancialGoalsPage;
