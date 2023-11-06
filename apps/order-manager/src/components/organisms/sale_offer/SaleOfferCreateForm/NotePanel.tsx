"use client";

import type { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { Button, FormInput } from "@acme/ui/molecules";

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreateNotePanel: FC = () => {
  const { register, control } = useFormContext<SaleOfferCreateFormFields>();

  const { fields, append, remove } = useFieldArray({
    name: "saleOfferNotes",
    control,
  });

  return (
    <div className="">
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Notlar</h3>
        <p className="mt-1 text-sm text-gray-500">
          Gizlenmiş notları müşteriniz göremez. Sadece siz
          görüntüleyebilirsiniz.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Notları her teklifte veya ilgili müşteriye yapılacak diğer tekliflerde
          kullanmak için sabitleyebilirsiniz.
        </p>
      </div>

      <div className="mt-2">
        <Button
          type="button"
          onClick={() =>
            append({
              text: "",
            })
          }
        >
          Add Note
        </Button>
      </div>

      {fields.map(({ id }, index) => (
        <div key={id} className="flex space-x-2 py-4">
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferNotes.${index}.text`}
            name={`saleOfferNotes.${index}.text`}
            type="text"
            // errors={errors.saleOfferNotes?.[index]}
            register={register}
            className="flex-1"
          />

          <Button
            variant={Button.variant.ACCENT}
            type="button"
            onClick={() => {
              remove(index);
            }}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};
