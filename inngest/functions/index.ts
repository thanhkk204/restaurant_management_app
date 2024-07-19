import reservation from "@/lib/models/reservation"
import { inngest } from "../inngest.client"
import table from "@/lib/models/table"
import { updateReservedReservationsStatus, updateReservedTable, updateSeatedReservationsStatus } from "../backgroundJobs"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s")
    return { event, body: "Hello, World!" }
  }
)

export const cronJob = inngest.createFunction(
  { id: "cron-job-after-5-minute" },
  { cron: "*/5 * * * *" },
  async ({ step }) => {
    console.log("cron job after 5 minute")
    updateReservedReservationsStatus()
    updateSeatedReservationsStatus()
    updateReservedTable()
  }
)
