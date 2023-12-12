import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Name", maxWidth: 200 },
        { text: "Address", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
