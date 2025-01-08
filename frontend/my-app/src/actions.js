"use server";

import { getHeaders } from "./app/api/actions/config";
import { getUser } from "./lib/token";

const baseUrl = "http://generationsbank_db:8080/api/guardian";
// const headers = getHe;
// headers.append("Content-Type", "application/json");

/**
 * Transfer funds between accounts.
 * @param {Object} data - { senderAccountId, receiverAccountId, amount }
 */
export async function transfer(data) {
  const response = await fetch(`${baseUrl}/transfer`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Add a dependent to a guardian.
 * @param {Object} data - { guardianId, dependentId }
 */
export async function addDependent(data) {
  console.log(data);
  const response = await fetch(`${baseUrl}/addDependent`, {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * View dependents for a guardian.
 * @param {number} guardianId - Guardian ID.
 */
export async function viewDependents(guardianId) {
  const response = await fetch(`${baseUrl}/${guardianId}/dependents`, {
    method: "GET",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

/**
 * View transactions with optional filters.
 * @param {number} guardianId - Guardian ID.
 * @param {Object} filters - { startDate, endDate, category }
 */
export async function viewTransactions(guardianId, filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${baseUrl}/viewTransactions/${guardianId}?${query}`,
    {
      method: "GET",
      headers: await getHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

/**
 * Approve or reject a transaction.
 * @param {number} transactionId - Transaction ID.
 * @param {boolean} approve - Approve or reject the transaction.
 */
export async function approveTransaction(transactionId, approve) {
  const query = new URLSearchParams({ transactionId, approve }).toString();
  const response = await fetch(`${baseUrl}/approveTransaction?${query}`, {
    method: "PUT",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Decode a JWT token and get the body (payload).
 * @param {string} token - The JWT token to decode.
 * @returns {Object} - The decoded JWT payload.
 */
export async function decodeJwt(token) {
  // Split the token into three parts: header, payload, signature
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  // Decode the payload (the second part of the token)
  const payload = parts[1];

  // Decode base64url to base64
  const base64Url = payload.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = base64Url.padEnd(
    base64Url.length + ((4 - (base64Url.length % 4)) % 4),
    "="
  );

  // Decode the base64 string into JSON
  const decoded = JSON.parse(atob(base64));

  return decoded;
}

export async function getIdUser() {
  return getUser();
}

export async function getAccount(userId) {
  //const query = new URLSearchParams(userId.toString());
  const response = await fetch(`${baseUrl}/getAccount/${userId}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Set a spending limit for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {number} limit - Spending limit.
 */
export async function setSpendingLimit(dependentAccountId, limit) {
  const query = new URLSearchParams({ dependentAccountId, limit }).toString();
  const response = await fetch(`${baseUrl}/setSpendingLimit?${query}`, {
    method: "PUT",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Set a daily limit for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {number} limit - Daily limit.
 */
export async function setDailyLimit(dependentAccountId, limit) {
  const query = new URLSearchParams({ dependentAccountId, limit }).toString();
  const response = await fetch(`${baseUrl}/setDailyLimit?${query}`, {
    method: "PUT",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Set a weekly limit for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {number} limit - Weekly limit.
 */
export async function setWeeklyLimit(dependentAccountId, limit) {
  const query = new URLSearchParams({ dependentAccountId, limit }).toString();
  const response = await fetch(`${baseUrl}/setWeeklyLimit?${query}`, {
    method: "PUT",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Set a monthly limit for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {number} limit - Monthly limit.
 */
export async function setMonthlyLimit(dependentAccountId, limit) {
  const query = new URLSearchParams({ dependentAccountId, limit }).toString();
  const response = await fetch(`${baseUrl}/setMonthlyLimit?${query}`, {
    method: "PUT",
    headers: await getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Set restrictions for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {Object} restrictionRequest - Restriction details.
 */
export async function setRestrictions(dependentAccountId, restrictionRequest) {
  console.log(dependentAccountId);
  const { time } = restrictionRequest;
  console.log(time);
  const response = await fetch(
    `${baseUrl}/setRestrictions/${dependentAccountId}`,
    {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(restrictionRequest),
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}
