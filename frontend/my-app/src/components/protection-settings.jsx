"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  setDailyLimit,
  setWeeklyLimit,
  setMonthlyLimit,
  setRestrictions,
  viewDependents,
} from "@/actions"; // Adjust the path to your fetch functions

export function ProtectionSettings({ guardianId }) {
  const [dailyLimit, setDailyLimitState] = useState(15);
  const [weeklyLimit, setWeeklyLimitState] = useState(50);
  const [monthlyLimit, setMonthlyLimitState] = useState(250);
  const [timeRestrictions, setTimeRestrictions] = useState({
    startTime: "08:00",
    endTime: "17:00",
  });
  const [selectedDependentId, setSelectedDependentId] = useState(null);
  const [dependents, setDependents] = useState([]); // Store dependents

  // Fetch dependents on mount
  useEffect(() => {
    const fetchDependents = async () => {
      try {
        const dependentsData = await viewDependents(guardianId); // Assuming a function to fetch dependents
        setDependents(dependentsData);
        if (dependentsData.length > 0) {
          setSelectedDependentId(dependentsData[0].id); // Set the first dependent by default
        }
      } catch (error) {
        console.error("Error fetching dependents:", error);
      }
    };

    fetchDependents();
  }, []);

  const handleSaveLimits = async () => {
    try {
      await setDailyLimit(selectedDependentId, dailyLimit);
      await setWeeklyLimit(selectedDependentId, weeklyLimit);
      await setMonthlyLimit(selectedDependentId, monthlyLimit);
      alert("Limits updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update limits.");
    }
  };

  const handleSaveRestrictions = async () => {
    try {
      if (!selectedDependentId) {
        alert("Please select a dependent account.");
        return;
      }

      // Function to ensure time is in HH:mm format
      const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours.padStart(2, "0")}:${minutes}`;
      };

      // Construct the restrictionRequest with the correct field names
      const restrictionRequest = {
        restrictionStart: formatTime(timeRestrictions.startTime), // Ensure HH:mm format
        restrictionEnd: formatTime(timeRestrictions.endTime), // Ensure HH:mm format
      };

      console.log(restrictionRequest.restrictionStart);
      console.log(restrictionRequest.restrictionEnd.toString());

      await setRestrictions(selectedDependentId, restrictionRequest);
      alert("Restrictions updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update restrictions.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Permission Levels Info */}
      <Alert>
        <AlertDescription className="space-y-2">
          <p className="font-medium">Permission Levels:</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium">Never:</span> Action is completely
              restricted.
            </li>
            <li>
              <span className="font-medium">Mid:</span> Requires explicit
              guardian approval for the action.
            </li>
            <li>
              <span className="font-medium">Open:</span> No restrictions;
              actions are fully allowed.
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Dependent Account Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Dependent Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedDependentId}
            onValueChange={(value) => setSelectedDependentId(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select dependent" />
            </SelectTrigger>
            <SelectContent>
              {dependents.map((dependent) => (
                <SelectItem key={dependent.id} value={dependent.id}>
                  {dependent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Spending Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Daily Limit:</Label>
            <Input
              type="number"
              value={dailyLimit}
              onChange={(e) => setDailyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>Weekly Limit:</Label>
            <Input
              type="number"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>Monthly Limit:</Label>
            <Input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimitState(Number(e.target.value))}
              className="w-[200px]"
            />
          </div>
          <button
            onClick={handleSaveLimits}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Limits
          </button>
        </CardContent>
      </Card>

      {/* Time Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Time Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Start Time:</Label>
            <Input
              type="time"
              value={timeRestrictions.startTime}
              onChange={(e) =>
                setTimeRestrictions((prev) => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
              className="w-[200px]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label>End Time:</Label>
            <Input
              type="time"
              value={timeRestrictions.endTime}
              onChange={(e) =>
                setTimeRestrictions((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
              className="w-[200px]"
            />
          </div>
          <button
            onClick={handleSaveRestrictions}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Restrictions
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
