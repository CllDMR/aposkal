import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Id", maxWidth: 100 },
        { text: "Priority", maxWidth: 100 },
        { text: "Start Date", maxWidth: 100 },
        { text: "End Date", maxWidth: 100 },
        { text: "Company Type", maxWidth: 100 },
        { text: "Source", maxWidth: 100 },
        { text: "Address", maxWidth: 100 },
        { text: "Company", maxWidth: 100 },
      ]}
    />
  );
};

export default Page;
