import { Heart } from "lucide-react";

export default function Lives({ lives }: { lives: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: lives }).map((_, i) => (
        <>
          <Heart
            width={24}
            fill="red"
            color="red"
            key={`life-icon-${i}`}
          ></Heart>
        </>
      ))}
    </div>
  );
}
