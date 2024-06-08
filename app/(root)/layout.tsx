import StreamVideoProvider from "@/providers/StreamClientProvider"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "AstroMeet",
  description:
    "Real-time video conferencing for everyone. Using your browser, share your video, desktop, and presentations with coworkers, clients, and friends.",
  icons: {
    icon: "/icons/logo.svg",
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}

export default RootLayout
