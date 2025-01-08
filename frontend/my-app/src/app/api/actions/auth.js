"use server";

import routes from "@/app/constants/routes";
import { redirect } from "next/navigation";

import { LoginUserSchema, RegisterUserSchema } from "@/lib/definitions";
import { CloudCog } from "lucide-react";
import { setToken } from "@/lib/token";

// This is the server I am using, change it if you you are working on another server for backend
const baseUrl = "http://backendContainer:8080";

// Required header to fetch for Post and Get
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function LoginAuth(formData) {
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  try {
    //fetch response from backend via api endpoint "/api/auth/login"
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(formObject),
    });
    console.log(response);

    if (!response.ok) {
      // Extract error message from response if available
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }
    const { token } = await response.json();

    // set token
    await setToken(token);
    console.log(token);
  } catch (error) {
    // if login is wrong (wrong credientals or user doesnt exist)
    console.error("Login error:", error);

    // returns to same page if something is wrong
    return {
      message: "Incorrect Credentials. Please try again.",
    };
  }

  // routes to about page if login is successful for time being
  redirect(routes.dashboard);
}

export async function registerAuth(formData) {
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const password = formData.get("password");
  const confirm_password = formData.get("confirm-password");

  // if password doesnt match confirm password
  if (password !== confirm_password) {
    console.log("password not confirmed");
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/api/auth/createUser`, {
      method: "POST",
      headers,
      body: JSON.stringify(formObject),
    });

    if (!response.ok) {
      // Extract error message from response if available
      const errorData = await response.json();

      throw new Error(
        errorData.message || "registration failed. Please try again."
      );
    }
  } catch (error) {
    // if registeration fails return to form without routing
    console.error("registration error");
    return {
      message: "Either username or email is already registered with.",
    };
  }

  // if registeration is successful, routes to about page for time being
  redirect(routes.login);
}
