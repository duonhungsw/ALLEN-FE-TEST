import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Footer from "@/components/layouts/Footer";
// import Navbar from "@/components/layouts/Navbar";
import QueryClientProvider from "@/context/QueryClientProvider";
import ReduxProvider from "@/context/ReduxProvider";
import AuthHydration from "@/context/AuthHydration";
import { ConfigProvider } from "antd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allen - Learn Anything",
  description: "Allen Courses - Learn Anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ConfigProvider>
          <ReduxProvider>
            <QueryClientProvider>
              <AuthHydration />
              <div className="min-h-screen flex flex-col">
                {/* <Navbar /> */}
                <main className="flex-1">{children}</main>
                {/* <Footer /> */}
              </div>
            </QueryClientProvider>
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
