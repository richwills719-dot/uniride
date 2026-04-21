import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "UniRide — Campus Transport Booking",
  description: "Book campus transport quickly and easily.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              borderRadius: "10px",
              background: "#0F1F3D",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
