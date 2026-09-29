// components/message-template.tsx
type Props<T extends React.ElementType> = React.ComponentProps<T>;

export function Root({ className = "", ...props }: Props<"div">) {
  return (
    <div
      className={`flex min-h-dvh w-full flex-col gap-8 bg-[#EC3013] p-8 justify-between ${className}`}
      {...props}
    />
  );
}

export function Header({ className = "", ...props }: Props<"header">) {
  return <header className={className} {...props} />;
}

export function Body({ className = "", ...props }: Props<"h1">) {
  return <h1 className={`text-6xl ${className}`} {...props}></h1>;
}

export function Footer({ className = "", ...props }: Props<"footer">) {
  return <footer className={`flex flex-col ${className}`} {...props} />;
}
