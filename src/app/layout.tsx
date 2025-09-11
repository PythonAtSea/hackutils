import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Heart, Clock, Timer, QrCode, Gpu, HandCoins } from "lucide-react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hackUtils",
  description: "adfree utilities by a hackclubber, for hackclubbers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2 py-2">
                <Link href="/" className="text-xl font-bold">
                  hackUtils
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>time</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/stopwatch">
                          <Timer className="size-4" />
                          <span>stopwatch</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/clock">
                          <Clock className="size-4" />
                          <span>clock</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>random</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/qrcode">
                          <QrCode className="size-4" />
                          <span>qr code</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/uuid">
                          <Gpu className="size-4" />
                          <span>uuid</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/coinflip">
                          <HandCoins className="size-4" />
                          <span>coin flip</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-2 p-2 text-sm">
                <p className="">
                  made with
                  <Heart
                    size={14}
                    className="inline-block animate-pulse text-red-800 [animation-duration:3s] mx-2"
                  />
                  by pythonatsea
                </p>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b justify-between">
              <SidebarTrigger />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[100vh_-_theme(spacing.16)] flex-1 rounded-xl p-4">
                {children}
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
