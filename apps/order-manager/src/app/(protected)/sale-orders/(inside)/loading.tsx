import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Id", maxWidth: 200 },
        { text: "Priority", maxWidth: 200 },
        { text: "Start Date", maxWidth: 200 },
        { text: "End Date", maxWidth: 200 },
        { text: "Company Type", maxWidth: 200 },
        { text: "Source", maxWidth: 200 },
        { text: "Address", maxWidth: 200 },
        { text: "Company", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
