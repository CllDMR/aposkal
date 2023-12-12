import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Name", maxWidth: 100 },
        { text: "City", maxWidth: 100 },
        { text: "District", maxWidth: 100 },
        { text: "Street", maxWidth: 100 },
        { text: "Country", maxWidth: 100 },
        { text: "State", maxWidth: 100 },
        { text: "Description", maxWidth: 100 },
        { text: "LongAddressDescription", maxWidth: 100 },
      ]}
    />
  );
};

export default Page;
