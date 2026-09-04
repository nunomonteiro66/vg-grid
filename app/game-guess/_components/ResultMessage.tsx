type ResultMessageProps = { won: boolean };

export default function ResultMessage({ won = false }: ResultMessageProps) {
  return (
    <div className={`border-2 ${won ? "text-green-700" : "text-red-700"}`}>
      {won ? (
        <div>
          CORRECT!!! <br />
          Nicely done
        </div>
      ) : (
        <div>
          FAILED!!! <br /> BETTER LUCK NEXT TIME{" "}
        </div>
      )}
    </div>
  );
}
