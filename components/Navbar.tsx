import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import { SignedIn, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-[#080E1E] px-6 py-4 lg:pr-10 lg:pl-[2rem]">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="AstroMeet logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-bold text-foreground max-sm:hidden">
          AstroMeet
        </p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
