type Props = {
  children?: React.ReactNode;
};

export default function StaticLayout({ children }: Props) {
  return <div className="mx-auto max-w-md text-center">{children}</div>;
}
