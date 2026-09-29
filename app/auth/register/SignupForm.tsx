"use client";

import { ComponentProps, useState } from "react";
import { signIn } from "next-auth/react";
import { TextField } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import Input from "@/components/ui/input";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "contents" }}>
      <Input placeholder="" name="username" label="Username" />

      <Input placeholder="" name="email" label="Email" type="email" />

      <Input placeholder="" name="passwword" label="Password" type="password" />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button className="rounded-none bg-[#EC3013] hover:bg-[#DD2B0F] text-white w-full text-start p-2">
        <span className="flex items-center gap-2 text-start w-full">
          Create Account
          <MoveRight />
        </span>
      </Button>
    </form>
  );
}
