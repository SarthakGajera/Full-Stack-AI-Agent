import { inngest } from "../client.js";
import User from "../../models/user.models.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "./../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User no longer exits in our database");
        }
        return userObject;
      }); // pipeline 1

      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to the app`;
        const message = `Hi,
        \n\n
        Thanks for signing up. we're glad to have you onboard!!`;

        await sendMail(user.email, subject, message);
      }); // pipeline 2
      console.log("Sending welcome email to:", user.email);

      return { success: true };
    } catch (error) {
      console.error("Error running step", error.message);
      return { success: false };
    }
  }
);
