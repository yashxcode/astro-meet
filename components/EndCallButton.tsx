"use client"

import { useRouter } from "next/navigation"
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"

import { Button } from "./ui/button"

const EndCallButton = () => {
  const call = useCall()
  const router = useRouter()

  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner =
    localParticipant &&
    call?.state?.createdBy &&
    localParticipant.userId == call.state.createdBy.id

  if (!isMeetingOwner) return null
  return (
    <Button
      onClick={async () => {
        await call.endCall()
        router.push("/dashboard")
      }}
      className="bg-[#DC433B] text-foreground hover:bg-[#f66159]"
    >
      End Call for everyone
    </Button>
  )
}

export default EndCallButton
