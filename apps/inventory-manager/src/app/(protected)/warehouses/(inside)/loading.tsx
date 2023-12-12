import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return <TableSkeleton headers={[{ text: "Title", maxWidth: 200 }]} />;
};

export default Page;
