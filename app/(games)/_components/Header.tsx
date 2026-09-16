import { Separator } from "radix-ui";

export default function Header({ pageTitle, children }) {
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center min-h-15">
        <h1>{pageTitle}</h1>
        <p>asdasd</p>
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
