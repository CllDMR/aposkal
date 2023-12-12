import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Title", maxWidth: 100 },
        { text: "Type", maxWidth: 100 },
        { text: "Is Foreign", maxWidth: 100 },
        { text: "Tax No", maxWidth: 100 },
        { text: "Tax Office", maxWidth: 100 },
        { text: "Firm Phone Number", maxWidth: 100 },
        { text: "Qualified Phone Number", maxWidth: 100 },
        { text: "Email", maxWidth: 100 },
      ]}
    />
  );
};

export default Page;
