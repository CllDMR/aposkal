"use client";

import { FunnelIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

import { Checkbox, Label } from "@acme/ui/atoms";
import { Button, FormInput, MyPopover } from "@acme/ui/molecules";

const ListTypeOptions = [
  { value: "DRAFT", label: "Taslak" },
  { value: "FORMALIZED", label: "Resmileştirildi" },
  { value: "SENT", label: "Gönderildi" },
  { value: "DENIED", label: "Reddedildi" },
  { value: "CANCELLED", label: "İptal Edildi" },
  { value: "ACCEPTED", label: "Kabul Edildi" },
];

const filterOptions: FilterOptionsType[] = [
  { name: "Durum", value: "status", type: "list" },
  { name: "Tarih", value: "date", type: "date" },
];

type FilterOptionsType = {
  name: string;
  value: string;
  type: string;
};

interface FilterMenuProps {
  filterOptions: FilterOptionsType[];
  close: any;
}

const Filter = () => {
  return (
    <MyPopover title={<FunnelIcon className="h-5 w-4" aria-hidden="true" />}>
      {(close) => (
        <div>
          <FilterMenu close={close} filterOptions={filterOptions} />
        </div>
      )}
    </MyPopover>
  );
};

export default Filter;

const FilterMenu = ({ filterOptions, close }: FilterMenuProps) => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  if (!selectedFilter) return null;

  return (
    <div className="">
      <div className="grid grid-cols-6">
        <div className="col-span-2 bg-gray-50 p-2">
          <nav className="space-y-1" aria-label="Sidebar">
            <ul>
              {filterOptions.map((item) => (
                <li key={item.value}>
                  <button
                    className={clsx(
                      item.value === selectedFilter.value
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-xs font-medium",
                    )}
                    onClick={() => setSelectedFilter(item)}
                    // aria-current={item.current ? "page" : undefined}
                  >
                    <span className="truncate">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-span-4 p-3">
          <div className="overflow-hidden bg-white  ">
            {selectedFilter.type === "list" && (
              <div>
                {ListTypeOptions.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.value}
                      name={item.value}
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                    <Label name={item.value} label={item.label} />
                  </div>
                ))}
              </div>
            )}
            {selectedFilter.type === "date" && (
              <div className="mt-3 space-y-3">
                <FormInput
                  id="start-date"
                  name="start-date"
                  label="Başlangıç Tarihi"
                  type="date"
                  variant={FormInput.variant.OVERLAPPING}
                />
                <FormInput
                  id="end-date"
                  name="end-date"
                  label="Bitiş Tarihi"
                  type="date"
                  variant={FormInput.variant.OVERLAPPING}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between bg-gray-100 px-4 py-2 text-right sm:px-6">
          <Button
            variant={Button.variant.WARNING}
            onClick={() => {
              close();
            }}
          >
            Vazgeç
          </Button>
          <Button variant={Button.variant.ACCENT}>Temizle</Button>
          <Button variant={Button.variant.PRIMARY}>Uygula</Button>
        </div>{" "}
      </div>
    </div>
  );
};
