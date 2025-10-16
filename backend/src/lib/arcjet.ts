import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./ENV.js";

// Ensure the API key exists at runtime
if (!ENV.ARCJET_KEY) {
  throw new Error("ARCJET_KEY environment variable is missing!");
}

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // 1️⃣ WAF protection: SQLi, XSS, common attacks
    shield({ mode: "LIVE" }),

    // 2️⃣ Bot detection
    detectBot({
      mode: "LIVE", // Blocks malicious bots
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow monitoring or previews if needed
        // "CATEGORY:MONITOR",
        // "CATEGORY:PREVIEW"
      ],
    }),

    // 3️⃣ Global rate limiting: 100 req/min per IP
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60, // seconds
    }),
  ],
});

// Extra function for sensitive endpoints (login/signup)
export const authRouteRateLimit = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Protect login/signup endpoints more strictly
    slidingWindow({
      mode: "LIVE",
      max: 5,      // 5 requests
      interval: 600, // per 10 minutes
    }),
detectBot({
  mode: "LIVE",
  allow: ["CATEGORY:SEARCH_ENGINE"], // correct way
}),
  ],
});

export default aj;
