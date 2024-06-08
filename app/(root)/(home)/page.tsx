import MeetingTypeSection from "@/components/MeetingTypeSection"

const Home = () => {
  const now = new Date()
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
  })
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "America/New_York",
  }).format(now)
  return (
    <section className="flex size-full flex-col gap-10 text-foreground">
      <div className="h-[300px] w-full rounded-[14px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-10">
          <h2 className="bg-white/20 backdrop-blur-sm max-w-[270px] rounded-[10px] py-2 text-center text-base font-normal">
            Upcoming Meeting at: 4:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-5xl">{time} EST</h1>
            <p className="text-lg font-medium text-[#C9DDFF] lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeSection />
    </section>
  )
}

export default Home
