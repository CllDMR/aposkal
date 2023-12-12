import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Name", maxWidth: 200 },
        { text: "Currency", maxWidth: 200 },
        { text: "Unit", maxWidth: 200 },
        { text: "Unit Price", maxWidth: 200 },
        { text: "KDV", maxWidth: 200 },
        { text: "Categories", maxWidth: 200 },
        { text: "Tags", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
