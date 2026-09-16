export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="w-4/5 m-auto mt-10 flex justify-center">{children}</div>
  );
}
