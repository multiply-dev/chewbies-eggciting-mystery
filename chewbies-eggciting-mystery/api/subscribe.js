// api/subscribe.js — Vercel Serverless Function
//
// Required environment variables (set in Vercel project dashboard):
//   RECAPTCHA_SECRET_KEY   — from Google reCAPTCHA admin console (secret key, not site key)
//   MAILCHIMP_API_KEY      — from MailChimp Account > Extras > API Keys
//   MAILCHIMP_LIST_ID      — from MailChimp Audience > Settings > Audience ID
//   MAILCHIMP_DC           — data center prefix, e.g. "us21" (last part of your API key)
//   MAILCHIMP_FORM_NAME    — e.g. "ChewbiesEggcitingMystery"

const ALLOWED_ORIGINS = [
  "https://multiply-dev.github.io",
  "https://hi-chew.com",
  "https://www.hi-chew.com",
];

function setCORSHeaders(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  setCORSHeaders(req, res);

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fname, lname, email, flavor, mysGuess, captchaToken } = req.body;

  // --- Basic input validation ---
  if (!email || !captchaToken) {
    return res.status(400).json({ error: "Email and reCAPTCHA token are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // --- 1. Verify reCAPTCHA token server-side with Google ---
  try {
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken,
      }),
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      console.warn("reCAPTCHA failed:", recaptchaData["error-codes"]);
      return res.status(400).json({ error: "reCAPTCHA verification failed. Please try again." });
    }
  } catch (err) {
    console.error("reCAPTCHA request error:", err);
    return res.status(500).json({ error: "Could not verify reCAPTCHA. Please try again." });
  }

  // --- 2. Subscribe to MailChimp ---
  const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_DC, MAILCHIMP_FORM_NAME } = process.env;
  const mailchimpUrl = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

  try {
    const mailchimpRes = await fetch(mailchimpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending", // "pending" = double opt-in. Change to "subscribed" to skip.
        merge_fields: {
          FNAME: fname || "",
          LNAME: lname || "",
          FLAVOR: flavor || "",
          MYS_GUESS: mysGuess || "",
          FORM: MAILCHIMP_FORM_NAME || "",
          ACCEPTS_MARKETING: "true",
        },
      }),
    });

    const mailchimpData = await mailchimpRes.json();

    if (mailchimpRes.ok) {
      return res.status(200).json({ message: "Success!" });
    }

    if (mailchimpData.title === "Member Exists") {
      return res.status(200).json({ message: "You're already subscribed!" });
    }

    console.error("MailChimp error:", mailchimpData);
    return res.status(500).json({ error: "Subscription failed. Please try again later." });
  } catch (err) {
    console.error("MailChimp request error:", err);
    return res.status(500).json({ error: "Subscription failed. Please try again later." });
  }
}
