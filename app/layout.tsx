import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AstroMeet",
  description:
    "Real-time video conferencing for everyone. Using your browser, share your video, desktop, and presentations with coworkers, clients, and friends.",
  icons: {
    icon: "/icons/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logo.svg",
            logoLinkUrl: "/",
          },
          baseTheme: dark,
          variables: {
            colorPrimary: "#3B82F6",
            colorTextOnPrimaryBackground: "#ffffff",
            colorBackground: "#080E1E",
            colorInputBackground: "#080E1E",
          },
        }}
      >
        <body className={`${inter.className} bg-background`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
