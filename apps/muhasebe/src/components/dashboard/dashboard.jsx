import { Assets } from "./assets";
import { Detail } from "./detail";
import { Profit } from "./profit";
import { Todo } from "./todo";

const Dashboard = () => {
  return (
    <div className="grid-cols-12 gap-4 xl:grid ">
      <div className="col-span-9">
        <Profit />
        <Detail />
      </div>
      <div className="col-span-3 ">
        <Assets />
        <Todo />
      </div>
    </div>
  );
};

export default Dashboard;
