

import BusinessCard from "@/components/BusinessCard"
import ChartSection from "@/components/ChartSection"
import { TimePicker } from "@/components/TimePicker"
import { colorsVariables } from "@/lib/constants"
import { CircleDollarSignIcon, HandCoins, ReceiptText, UserRound } from 'lucide-react'

export default function DashBoardPage() {
  return (
    <>
      <div>
        <div className="w-full py-5 flex justify-end items-center ">
          <TimePicker />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  2xl:grid-cols-4 gap-10">
        <BusinessCard
          title="Month's Money"
          color={colorsVariables.blue}
          value="$53,000"
          icons={<CircleDollarSignIcon />}
        />
        <BusinessCard
          title="Month's Revenue"
          color={colorsVariables.green}
          value="$13,000"
          icons={<HandCoins />}
        />
        <BusinessCard
          title="Month's receipt"
          color={colorsVariables.orange}
          value="300"
          icons={<ReceiptText />}
        />
        <BusinessCard
          title="Month's Client"
          color={colorsVariables.red}
          value="23"
          icons={<UserRound />}
        />
      </div>

      <ChartSection />
    </>
  )
}
