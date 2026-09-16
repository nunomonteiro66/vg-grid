export default function Lives({ lives }: { lives: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: lives }).map((_, i) => (
        <span className="h-4 w-6 bg-red-700" key={i}></span>
      ))}
    </div>
  );
}
