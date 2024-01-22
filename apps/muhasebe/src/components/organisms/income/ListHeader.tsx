
import Filter from "~/components/molecules/income/Filter";
import NewActionButton from "~/components/molecules/NewAction";

const ListHeader = () => {
  return (
    <div className="flex justify-between">
      {" "}
      <Filter /> <NewActionButton />
    </div>
  );
};

export default ListHeader;
