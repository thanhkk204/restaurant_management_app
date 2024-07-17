import { inngest } from "../inngest.client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  },
);

export const cronJob = inngest.createFunction(
    { id: "cron-job-after-1-minute" },
    { cron: "*/10 * * * *" },
    async ({ step }) => {
        console.log('cron job after 10 minute')
        return { body: "Hello, World!" };
    }
  );