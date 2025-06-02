"use client";
import { SignInButton } from "@clerk/nextjs";

export default function HomeClient() {
  return (
    <main>
      <h1>Welcome to CS2 Team Site!</h1>
      <SignInButton />
    </main>
  );
}
