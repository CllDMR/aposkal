"use client";

import type { FC } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreatePreviewPanel: FC = () => {
  const [formValues, setFormValues] = useState({});

  const { getValues } = useFormContext<SaleOfferCreateFormFields>();

  return (
    <div className="">
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Önizleme
        </h3>
      </div>

      <div className="mt-2">
        <Button type="button" onClick={() => setFormValues(getValues())}>
          Get Form Values
        </Button>
      </div>

      <div className="">
        <pre className="">{JSON.stringify(formValues, null, 4)}</pre>
      </div>
    </div>
  );
};
