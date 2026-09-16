import { useEffect, useState } from "react";
import Card from "./Card";
import { Guess } from "../page";

type Game = {
  id: number;
  name: string;
  wrong: boolean;
};

type GuessesProps = {
  guesses: Guess[];
};

export default function Guesses({ guesses }: GuessesProps) {
  return (
    <Card title="THIS ROUND'S GUESSES">
      {guesses?.map((guess) => (
        <p
          key={`game-guess-${guess.id}`}
          className={`${guess.close ? "text-yellow-600" : "text-red-700"}`}
        >
          {guess.name}
        </p>
      ))}

      {guesses.length === 0 && <p>No guesses yet</p>}
    </Card>
  );
}
