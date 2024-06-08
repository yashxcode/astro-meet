"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/useGetCallById"
import Loader from "@/components/Loader"
import { useParams } from "next/navigation"

const Meeting = () => {
  const { id } = useParams()
  const { user, isLoaded } = useUser()
  const { call, isCallLoading } = useGetCallById(id)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
