export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="w-4/5 m-auto flex flex-col justify-center">{children}</div>
  );
}
