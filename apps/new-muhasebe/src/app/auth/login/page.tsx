import LoginForm from "~/components/LoginForm";

interface PageProps {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ params: {}, searchParams: {} }: PageProps) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
