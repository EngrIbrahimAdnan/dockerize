"use client";

import Link from "next/link";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { useFormState } from "react-dom";

import { LoginAuth } from "@/app/api/actions/auth";

import "../globals.css";
import routes from "../constants/routes";
const baseUrl = "http://generationsbank_db:8080";

export default function LoginPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    async function generateQRCode() {
      try {
        const url = await QRCode.toDataURL("http://192.168.8.92:3000/login", {
          width: 900, // Higher width for sharper QR code
          margin: 0,
          color: {
            dark: "#000000", // QR code color
            light: "#00000000", // Transparent background
          }, // Remove extra margin for better visual quality
        }); // Replace with your data
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    }

    generateQRCode();
  }, []);

  const [isLoading, setIsLoading] = useState(false); // For button state
  const [errorMessage, setErrorMessage] = useState(""); // For error message

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state
    setErrorMessage(""); // Clear any previous error messages

    const formData = new FormData(event.target);

    // Call the LoginAuth function
    const result = await LoginAuth(formData);

    if (result && result.message) {
      setErrorMessage(result.message); // Show error message if any
    } else {
      // Redirect or perform other actions on success
      console.log("Login successful!");
    }

    setIsLoading(false); // Reset loading state
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 relative overflow-hidden ">
      <AnimatedBackground />
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        <div className="relative hidden h-full flex-col bg-muted  text-white dark:border-r lg:flex ">
          <div className="relative z-20 flex items-center text-lg font-medium "></div>

          <img
            src="/Login1.png?height=500&width=400"
            alt="Placeholder illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:p-8 relative z-10 pt-20 pr-10 pl-10 md:pr-0 md:pl-0"
        >
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back <User className="inline-block ml-1 h-6 w-6" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="Enter your Username"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                  required
                />
              </div>

              {/* Display error message */}
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Review our{" "}
              <Link
                href={routes.terms}
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href={routes.privacy}
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Haven't signed up yet?{" "}
              <Link
                href={routes.register}
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </div>

            <h2 className="text-lg font-medium mb-4 items-center justify-center flex">
              Or scan QR code
            </h2>

            <div className=" inset-0 flex items-center justify-center">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="w-52 object-contain"
                />
              ) : (
                <p>Loading QR Code...</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
