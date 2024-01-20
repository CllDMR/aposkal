import type { FC } from "react";

import { Assets } from "./assets";
import { Detail } from "./detail";
import { Profit } from "./profit";
import { Todo } from "./todo";

export const Dashboard: FC = () => {
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
