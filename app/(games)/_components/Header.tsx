import { Separator } from "radix-ui";

type HeaderProps = {
  pageTitle: string;
  children: React.ReactNode;
};

export default function Header({ pageTitle, children }: HeaderProps) {
  return (
    <header className="w-screen relative left-1/2 right-1/2 mx-[-50vw] mb-6 pb-2">
      <div className="flex justify-between items-center min-h-15 ml-6 mr-6">
        <h1>{pageTitle}</h1>
        {children}
      </div>
      <Separator.Root
        className="mb-5 h-0.5 bg-gray-500"
        decorative
      ></Separator.Root>
      <Separator.Root
        className="mb-3 h-0.5 bg-gray-500"
        decorative
      ></Separator.Root>
    </header>
  );
}
