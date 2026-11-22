import arcjet, { tokenBucket } from "@arcjet/next";

// Free tier: 10 requests per day
export const freeAj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 10,
      interval: 86400,
      capacity: 10,
    }),
  ],
});

// Premium tier: 100 requests per day
export const premiumAj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 100,
      interval: 86400,
      capacity: 100,
    }),
  ],
});