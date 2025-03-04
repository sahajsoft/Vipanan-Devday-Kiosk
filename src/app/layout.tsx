import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { PrimeReactProviders } from "@/components/providers/prime-react-provider";
import { ConfirmationProvider } from "@/context/confirmation-context";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vipanan DevDay Kiosk",
  description: "Attendance management kiosk for DevDay events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
          <PrimeReactProviders>
            <ConfirmationProvider>
              {children}
            </ConfirmationProvider>
          </PrimeReactProviders>
      </body>
    </html>
  );
}
