import { Orbitron } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

config.autoAddCss = false;

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={orbitron.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
