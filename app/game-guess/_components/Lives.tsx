import { Heart } from "lucide-react";
import Card from "./Card";

type LivesProps = {
  totalLives: number;
  currentLives: number;
};

export default function Lives({ totalLives, currentLives }: LivesProps) {
  return (
    <Card title="LIVES">
      <div className="flex gap-1">
        {Array.from({ length: currentLives }).map((_, i) => (
          <Heart fill="red" color="red" key={`heart-icon-${i}`} />
        ))}
      </div>
      <p>
        {currentLives} of {totalLives} lives left
      </p>
    </Card>
  );
}
