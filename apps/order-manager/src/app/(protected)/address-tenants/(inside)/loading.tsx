import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        "Name",
        "City",
        "District",
        "Street",
        "Country",
        "State",
        "Description",
        "LongAddressDescription",
      ]}
    />
  );
};

export default Page;
