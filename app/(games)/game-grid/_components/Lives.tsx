import { ComponentProps } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type LivesProps = ComponentProps<"div"> & {
  lives: number;
};

export default function Lives({ lives, className }: LivesProps) {
  return (
    <div className={cn("flex gap-1 justify-center", className)}>
      {Array.from({ length: lives }).map((_, i) => (
        <Heart width={24} fill="red" color="red" key={`life-icon-${i}`}></Heart>
      ))}
    </div>
  );
}
