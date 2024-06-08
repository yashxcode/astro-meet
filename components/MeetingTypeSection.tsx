"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useToast } from "./ui/use-toast"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

import HomeCard from "./HomeCard"
import MeetingModal from "./MeetingModal"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import ReactDatePicker from "react-datepicker"

const MeetingTypeSection = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()

  const { user } = useUser()
  const client = useStreamVideoClient()

  const createMeeting = async () => {
    if (!user || !client) return

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" })
        return
      }

      const id = crypto.randomUUID()
      const call = client.call("default", id)

      if (!call) throw new Error("Failed to create a new call")

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant Meeting"

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: "New meeting created" })
    } catch (error) {
      console.error(error)
      toast({ title: "Failed to create a meeting" })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        imgUrl="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-[#E00A39]"
      />
      <HomeCard
        imgUrl="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Pre-Plan your meetings"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-[#F9A90E]"
      />
      <HomeCard
        imgUrl="/icons/recordings.svg"
        title="View Recordings"
        description="Check your past recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-[#830EF9]"
      />
      <HomeCard
        imgUrl="/icons/join-meeting.svg"
        title="Join a Meeting"
        description="Attend via Invite Links"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-[#FF742E]"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a New Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px]">
              Meeting Description
            </label>
            <Textarea
              className="border-none bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label>Select a date and time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-accent p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: "Meeting link copied to clipboard" })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter Meeting Link to Join"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeSection
