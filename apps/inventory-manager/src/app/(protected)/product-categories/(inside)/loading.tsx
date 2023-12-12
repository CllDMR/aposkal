import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return <TableSkeleton headers={[{ text: "Name", maxWidth: 100 }]} />;
};

export default Page;
