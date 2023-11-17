"use client";

import type { Dispatch, FC, SetStateAction } from "react";

import { DebouncedInput } from "./debounced-input";

export interface TableGlobalFilterProps {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
}

export const TableGlobalFilter: FC<TableGlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <DebouncedInput
      value={globalFilter ?? ""}
      onChange={(value) => setGlobalFilter(String(value))}
      className="font-lg border-block mb-2 border p-2 shadow"
      placeholder="Search all columns..."
    />
  );
};
