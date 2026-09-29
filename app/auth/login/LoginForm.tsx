"use client";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { MoveRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  AccessDenied: "Access denied.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method.",
  Default: "Something went wrong. Please try again.",
};

type LoginFormProps = {
  callbackUrl: string;
  initialError?: string;
};

export default function LoginForm({
  callbackUrl,
  initialError,
}: LoginFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(errorMessages[result.error] ?? errorMessages.Default);
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh(); // so Server Components pick up the new session
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "contents" }}>
      <Input placeholder="" name="email" label="Email" type="email" />

      <Input placeholder="" name="passwword" label="Password" type="password" />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button className="rounded-none bg-[#EC3013] hover:bg-[#DD2B0F] text-white w-full text-start p-2">
        <span className="flex items-center gap-2 text-start w-full">
          Login
          <MoveRight />
        </span>
      </Button>
    </form>
  );
}
