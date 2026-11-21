import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

// Free tier: 10 requests per day
export const freeAj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 10,
      interval: 86400, // 24 hours in seconds
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
      interval: 86400, // 24 hours in seconds
      capacity: 100,
    }),
  ],
});

export async function POST(req: Request) {
  const userId = "user123";

  const decision = await freeAj.protect(req, {
    userId,
    requested: 5,
  });

  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}