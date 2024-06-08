"use client"

import { useEffect, useState } from "react"
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk"
import { Button } from "./ui/button"

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
  const call = useCall()

  if (!call) {
    throw new Error("Call is not defined")
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-foreground">
      <h1 className="text-2xl font-semibold">Setup your meeting</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with Mic and Camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-primary px-4 py-2.5 text-foreground"
        onClick={() => {
          call?.join()
          setIsSetupComplete(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
