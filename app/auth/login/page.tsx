import * as MessageTemplate from "@/app/auth/_components/MessageTemplate";
import * as FormTemplate from "@/app/auth/_components/FormTemplate";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { callbackUrl, error } = await searchParams;

  // Only allow redirects within your own site
  //!!!!!!!!!
  const safeCallbackUrl = callbackUrl?.startsWith("/") ? callbackUrl : "/";

  if (session) redirect(safeCallbackUrl);

  return (
    <div className="flex">
      <MessageTemplate.Root>
        <MessageTemplate.Header></MessageTemplate.Header>
        <MessageTemplate.Body>
          Welcome back. Your streak is waiting
        </MessageTemplate.Body>
        <MessageTemplate.Footer>
          <span className="flex gap-3 items-center justify-start border-t-2 border-white p-3"></span>
        </MessageTemplate.Footer>
      </MessageTemplate.Root>

      <FormTemplate.Root>
        <FormTemplate.Header>
          <h2 className="text-4xl">Log in</h2>
        </FormTemplate.Header>
        <FormTemplate.Body>
          <LoginForm></LoginForm>
        </FormTemplate.Body>
      </FormTemplate.Root>
    </div>
  );
}
