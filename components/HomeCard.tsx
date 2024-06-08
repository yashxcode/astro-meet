import { cn } from "@/lib/utils"
import Image from "next/image"

interface HomeCardProps {
  className?: string
  imgUrl: string
  title: string
  description: string
  handleClick: () => void
}

const HomeCard = ({
  className,
  imgUrl,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-white/20 backdrop-blur-sm size-12 rounded-[10px]">
        <Image src={imgUrl} alt="Add Meeting Icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-medium">{description}</p>
      </div>
    </div>
  )
}

export default HomeCard
