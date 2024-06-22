"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { avatarImages } from "@/constants"

interface MeetingCardProps {
  title: string
  date: string
  icon: string
  isPreviousMeeting?: boolean
  buttonIcon1?: string
  buttonText?: string
  handleClick: () => void
  link: string
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast()

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-md bg-accent px-5 py-8">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={24} height={24} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold truncate">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article
        className={cn("flex justify-start md:justify-center relative", {})}
      >
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex justify-center items-center absolute left-[136px] size-10 rounded-full border-[8px] border-[#080E1E] bg-[#080E1E]">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-primary text-foreground px-5"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={18} height={18} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(link)
                toast({
                  title: "Meeting link copied to clipboard",
                })
              }}
              className="px-5 text-foreground hover:bg-background/80"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={24}
                height={24}
              />
              &nbsp; Meeting Link
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}

export default MeetingCard
