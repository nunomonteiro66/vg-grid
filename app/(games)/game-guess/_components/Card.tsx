type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col bg-[#262323] p-4 gap-3">
      <p className="text-red-700">{title}</p>
      {children}
    </div>
  );
}
