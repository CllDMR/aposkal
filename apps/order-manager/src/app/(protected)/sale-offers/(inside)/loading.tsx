import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={["No", "Start Date", "End Date", "Address", "Company"]}
    />
  );
};

export default Page;
