import type { Request, Response, NextFunction } from "express";
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const ArcjetProtection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const arcjetReq = {
      headers: req.headers as Record<string, string>, // cast headers
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip || req.socket.remoteAddress || "0.0.0.0", // fallback
      body: req.body,
      cookies: req.cookies || {}, 
    };
    // Run Arcjet protection
    const decision = await aj.protect(arcjetReq );

    // 1️⃣ Check for denial reasons
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      }
      // Generic denial fallback
      return res.status(403).json({ message: "Access denied by security policy." });
    }

    // 2️⃣ Check for spoofed/malicious bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    // ✅ All checks passed
    next();
  } catch (error) {
    // Log error and block request to prevent bypass
    console.error("Arcjet Protection Error:", (error as Error).message);
    return res.status(500).json({ message: "Security check failed. Try again later." });
  }
};
