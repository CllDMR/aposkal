import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        "Name",
        "Currency",
        "Unit",
        "Unit Price",
        "KDV",
        "Categories",
        "Tags",
      ]}
    />
  );
};

export default Page;
