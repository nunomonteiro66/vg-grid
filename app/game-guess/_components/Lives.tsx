import { Heart } from "lucide-react";
import Card from "./Card";

export default function Lives() {
  return (
    <Card title="LIVES">
      <Heart fill="red" color="red" />
      <p>5 of 5 lives left</p>
    </Card>
  );
}
