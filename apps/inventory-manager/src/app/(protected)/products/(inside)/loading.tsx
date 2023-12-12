import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Name", maxWidth: 100 },
        { text: "Currency", maxWidth: 100 },
        { text: "Unit", maxWidth: 100 },
        { text: "Unit Price", maxWidth: 100 },
        { text: "KDV", maxWidth: 100 },
        { text: "Categories", maxWidth: 100 },
        { text: "Tags", maxWidth: 100 },
      ]}
    />
  );
};

export default Page;
