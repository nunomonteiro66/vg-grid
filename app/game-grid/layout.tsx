export default function Layout({ children }: LayoutProps<"/">) {
  return <div className="w-2/3 m-auto flex justify-center">{children}</div>;
}
