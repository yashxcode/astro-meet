"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"

const Table = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium lg:text-lg xl:min-w-32">{title}:</h1>
      <h1 className="truncate text-sm font-semibold max-sm:max-w-[320px] lg:text-lg">
        {description}
      </h1>
    </div>
  )
}

const PersonalRoom = () => {
  const { user } = useUser()
  const meetingId = user?.id
  const { toast } = useToast()
  const client = useStreamVideoClient()
  const router = useRouter()

  const { call } = useGetCallById(meetingId!)

  const startRoom = async () => {
    if (!client || !user) return

    const newCall = client.call("default", meetingId!)

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  return (
    <section className="flex size-full flex-col gap-10 text-foreground">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex flex-col w-full gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.firstName}'s Meeting Room`}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="text-foreground" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          variant="secondary"
          className="text-foreground"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({
              title: "Meeting link copied to clipboard",
            })
          }}
        >
          Copy Invitation Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
