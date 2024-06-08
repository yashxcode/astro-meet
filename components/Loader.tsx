import Image from "next/image"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Image src="/icons/circles.svg" alt="Loading" width={36} height={36} />
    </div>
  )
}

export default Loader
