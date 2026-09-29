import { Separator } from "@/components/ui/separator";
import SignupForm from "./SignupForm";
import { Clock } from "lucide-react";
import * as MessageTemplate from "@/app/auth/_components/MessageTemplate";
import * as FormTemplate from "@/app/auth/_components/FormTemplate";

export default function RegisterPage() {
  return (
    <div className="flex">
      <MessageTemplate.Root>
        <MessageTemplate.Header></MessageTemplate.Header>
        <MessageTemplate.Body>
          One game a day. Keep every streak
        </MessageTemplate.Body>
        <MessageTemplate.Footer>
          <div className="flex gap-3 items-center justify-start border-t-2 border-white p-3">
            <Clock></Clock>
            <p>Full history of past days</p>
          </div>
          <div className="flex gap-3 items-center justify-start border-t-2 border-b-2 border-white p-3">
            <Clock></Clock>
            <p>Streaks saved across devices</p>
          </div>
        </MessageTemplate.Footer>
      </MessageTemplate.Root>

      <FormTemplate.Root>
        <FormTemplate.Header>
          <h2 className="text-4xl">Create account</h2>
          <span className="text-[15px] text-[#605D5D]">
            Free. No email newsletters.
          </span>
        </FormTemplate.Header>
        <FormTemplate.Body>
          <SignupForm></SignupForm>
        </FormTemplate.Body>
      </FormTemplate.Root>
    </div>
  );
}
