import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import {
  admin,
  emailOTP,
  phoneNumber,
  twoFactor,
  username,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./brevo";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      defaultRole: "patient",
      adminRoles: ["admin"],
    }),
    phoneNumber(),
    username(),
    twoFactor(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await sendEmail({
            to: email,
            subject: "Your OTP for Sign-In",
            html: `<p>Your OTP for sign-in is: <strong>${otp}</strong></p>`,
          });
        } else if (type === "email-verification") {
          await sendEmail({
            to: email,
            subject: "Verify your email",
            html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`,
          });
        } else {
          await sendEmail({
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
          });
        }
      },
    }),
    nextCookies(),
  ],
});
