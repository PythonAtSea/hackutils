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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { FloatingSidebarTrigger } from "@/components/FloatingSidebarTrigger";
import Link from "next/link";
import {
  Heart,
  Clock,
  Timer,
  QrCode,
  Gpu,
  HandCoins,
  AlarmClock,
  ScanSearch,
  Dices,
  Hash,
  Thermometer,
  RulerDimensionLine,
  Anvil,
  ScanLine,
} from "lucide-react";
import { KeyboardLegend } from "@/components/KeyboardLegend";
import { ImmersiveModeProvider } from "@/components/ImmersiveModeProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeButton } from "@/components/ThemeButton";

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
  const sidebarLinks = [
    {
      name: "time",
      items: [
        {
          name: "stopwatch",
          href: "/stopwatch",
          icon: <Timer className="size-4" />,
        },
        {
          name: "clock",
          href: "/clock",
          icon: <Clock className="size-4" />,
        },
        {
          name: "countdown",
          href: "/countdown",
          icon: <AlarmClock className="size-4" />,
        },
      ],
    },
    {
      name: "unit conversions",
      items: [
        {
          name: "temperature",
          href: "/temperature",
          icon: <Thermometer className="size-4" />,
        },
        {
          name: "length",
          href: "/length",
          icon: <RulerDimensionLine className="size-4" />,
        },
        {
          name: "weight",
          href: "/weight",
          icon: <Anvil className="size-4" />,
        },
      ],
    },
    {
      name: "random",
      items: [
        {
          name: "uuid",
          href: "/uuid",
          icon: <Gpu className="size-4" />,
        },
        {
          name: "coin flip",
          href: "/coinflip",
          icon: <HandCoins className="size-4" />,
        },
        {
          name: "randint",
          href: "/randint",
          icon: <Dices className="size-4" />,
        },
        {
          name: "hash",
          href: "/hash",
          icon: <Hash className="size-4" />,
        },
      ],
    },
    {
      name: "visual codes",
      items: [
        {
          name: "qr code",
          href: "/qrcode",
          icon: <QrCode className="size-4" />,
        },
        {
          name: "apriltag",
          href: "/apriltag",
          icon: <ScanSearch className="size-4" />,
        },
        {
          name: "datamatrix",
          href: "/datamatrix",
          icon: <ScanLine className="size-4" />,
        },
      ],
    },
  ];
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider>
            <ImmersiveModeProvider>
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center gap-2 px-2 py-2">
                    <Link href="/" className="text-xl font-bold">
                      hackUtils
                    </Link>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  {sidebarLinks.map((group) => {
                    return (
                      <SidebarGroup key={group.name}>
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {group.items.map((item) => {
                              return (
                                <SidebarMenuItem key={item.name}>
                                  <SidebarMenuButton asChild>
                                    <Link href={item.href}>
                                      {item.icon}
                                      <span>{item.name}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    );
                  })}
                </SidebarContent>
                <SidebarFooter>
                  <div className="flex flex-col gap-2 p-2 text-sm">
                    <p>
                      made with
                      <Heart
                        size={14}
                        className="inline-block animate-pulse text-red-800 [animation-duration:3s] mx-2"
                      />
                      by{" "}
                      <Link
                        href="https://github.com/pythonatsea"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        pythonatsea
                      </Link>
                    </p>
                  </div>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  <div className="min-h-[100vh_-_theme(spacing.16)] flex-1 rounded-xl p-4">
                    {children}
                  </div>
                </main>
              </SidebarInset>
              <KeyboardLegend />
              <FloatingSidebarTrigger />
              <ThemeButton />
            </ImmersiveModeProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
