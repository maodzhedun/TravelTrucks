import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "TravelTrucks - Camper Rental",
  description:
    "Rent the perfect camper for your next adventure. Explore our wide selection of campervans and motorhomes.",
  keywords: "camper rental, RV rental, motorhome, campervan, travel, adventure",
  authors: [{ name: "TravelTrucks Team" }],
  openGraph: {
    title: "TravelTrucks - Camper Rental",
    description: "Rent the perfect camper for your next adventure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#3cbc81",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#e44848",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
