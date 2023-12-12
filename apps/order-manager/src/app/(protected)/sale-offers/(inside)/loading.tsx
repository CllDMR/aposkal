import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "No", maxWidth: 200 },
        { text: "Start Date", maxWidth: 200 },
        { text: "End Date", maxWidth: 200 },
        { text: "Address", maxWidth: 200 },
        { text: "Company", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
