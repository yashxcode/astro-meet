"use client"

import { FloatingNav } from "@/components/FloatingNavbar"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Stars } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]
const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/" },
  { name: "Documentation", link: "/" },
  { name: "Support", link: "/" },
]

const LandingPage = () => {
  const router = useRouter()
  const color = useMotionValue(COLORS[0])
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [])

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-4 text-gray-200"
    >
      <FloatingNav navItems={navItems} />
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 inline-block rounded-full bg-gray-600/50 backdrop-blur-lg px-3 py-1.5 text-base">
          Beta Now Live!
        </span>
        <h1 className="max-w-5xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl md:text-8xl">
          Video calls loved by extraordinary teams.
        </h1>
        <p className="max-w-3xl text-center text-lg text-[#7F7F7F] my-6 leading-relaxed">
          Meetings don&apos;t have to crush your soul. Discover radically unique
          video calls designed to help hybrid-remote teams create, collaborate
          and celebrate.
        </p>
        <motion.button
          onClick={() => router.push("/dashboard")}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          style={{ border, boxShadow }}
          className="group relative flex w-fit items-center text-xl gap-1.5 rounded-full bg-gray-950/50 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/80"
        >
          Try for free
          <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  )
}

export default LandingPage
