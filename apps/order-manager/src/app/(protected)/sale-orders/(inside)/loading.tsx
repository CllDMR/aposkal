import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        "Id",
        "Priority",
        "Start Date",
        "End Date",
        "Company Type",
        "Source",
        "Address",
        "Company",
      ]}
    />
  );
};

export default Page;
