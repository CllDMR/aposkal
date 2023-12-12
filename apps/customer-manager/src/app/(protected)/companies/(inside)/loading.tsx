import { TableSkeleton } from "@acme/ui/organisms";

const Page = () => {
  return (
    <TableSkeleton
      headers={[
        { text: "Title", maxWidth: 200 },
        { text: "Type", maxWidth: 200 },
        { text: "Is Foreign", maxWidth: 200 },
        { text: "Tax No", maxWidth: 200 },
        { text: "Tax Office", maxWidth: 200 },
        { text: "Firm Phone Number", maxWidth: 200 },
        { text: "Qualified Phone Number", maxWidth: 200 },
        { text: "Email", maxWidth: 200 },
      ]}
    />
  );
};

export default Page;
