import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Name", maxWidth: 200 },
        { text: "City", maxWidth: 200 },
        { text: "District", maxWidth: 200 },
        { text: "Street", maxWidth: 200 },
        { text: "Country", maxWidth: 200 },
        { text: "State", maxWidth: 200 },
        { text: "Description", maxWidth: 200 },
        { text: "LongAddressDescription", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
