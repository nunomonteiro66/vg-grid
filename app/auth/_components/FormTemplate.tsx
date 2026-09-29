import { Separator } from "@/components/ui/separator";

type Props<T extends React.ElementType> = React.ComponentProps<T>;

export function Root({ className = "", ...props }: Props<"div">) {
  return (
    <div className="flex flex-col w-full h-dvh items-stretch justify-start p-8">
      <div
        className={`flex flex-col content-start items-center gap-10 w-full h-dvh ${className}`}
        {...props}
      />
    </div>
  );
}

export function Header({ className = "", children, ...props }: Props<"div">) {
  return (
    <div className={`w-full gap-3 flex flex-col ${className}`} {...props}>
      {children}
      <Separator className="h-0.5!"></Separator>
    </div>
  );
}

export function Body({ className = "", children }: Props<"div">) {
  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>{children}</div>
  );
}
