import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        "Title",
        "Type",
        "Is Foreign",
        "Tax No",
        "Tax Office",
        "Firm Phone Number",
        "Qualified Phone Number",
        "Email",
      ]}
    />
  );
};

export default Page;
