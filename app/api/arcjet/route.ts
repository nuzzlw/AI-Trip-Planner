import { NextResponse } from "next/server";
import { freeAj } from "./config";

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