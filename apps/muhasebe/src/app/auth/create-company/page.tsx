interface PageProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
}

// eslint-disable-next-line no-empty-pattern
export default function Page({ params: {}, searchParams: {} }: PageProps) {
  return <div>Page</div>;
}
