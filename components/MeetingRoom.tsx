import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Shapes, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EndCallButton from "./EndCallButton"
import Loader from "./Loader"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const isPersonalRoom = !!searchParams.get("personal")
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const router = useRouter()

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-foreground">
      <div className="relative flex size-full justify-center items-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "w-full block max-w-[350px]": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-[0.9rem] flex-wrap">
        <CallControls onLeave={() => router.push("/dashboard")} />
        <DropdownMenu>
          <div className="flex justify-centeritems-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232D] px-2 py-2 hover:bg-[#4C535B]">
              <Shapes size={18} className="text-foreground" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-none text-foreground">
            {["Grid", "Speaker Left", "Speaker Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="cursor-pointer rounded-full bg-[#19232D] px-2 py-2 hover:bg-[#4C535B]"
        >
          <Users size={18} className="text-foreground" />
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
