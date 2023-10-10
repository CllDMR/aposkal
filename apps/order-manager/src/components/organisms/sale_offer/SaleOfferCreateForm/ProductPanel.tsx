"use client";

import type { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormSection } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreateProductPanel: FC = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SaleOfferCreateFormFields>();

  const { fields, append } = useFieldArray({
    name: "saleOfferProducts",
    control,
  });

  return (
    <div className="divide-y">
      <div className="">Ürün ve Hizmetler</div>

      {fields.map((item, index) => (
        <FormSection key={item.id} label="Test Bilgiler" description="lorem.">
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${index}.currency`}
            label="Döviz Cinsi"
            name={`saleOfferProducts.${index}.currency`}
            type="text"
            errors={errors.saleOfferProducts?.[index]}
            register={register}
          />
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${index}.amount`}
            label="Miktar"
            name={`saleOfferProducts.${index}.amount`}
            type="text"
            errors={errors.saleOfferProducts?.[index]}
            register={register}
          />
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${index}.unitPrice`}
            label="Birim Fiyat"
            name={`saleOfferProducts.${index}.unitPrice`}
            type="text"
            errors={errors.saleOfferProducts?.[index]}
            register={register}
          />
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${index}.kdv`}
            label="KDV"
            name={`saleOfferProducts.${index}.kdv`}
            type="text"
            errors={errors.saleOfferProducts?.[index]}
            register={register}
          />
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${index}.total`}
            label="Total"
            name={`saleOfferProducts.${index}.total`}
            type="text"
            errors={errors.saleOfferProducts?.[index]}
            register={register}
          />
        </FormSection>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            amount: 0,
            currency: "",
            kdv: 0,
            productId: "",
            saleOfferId: "",
            total: 0,
            unitPrice: 0,
          })
        }
      >
        Add Product
      </Button>
    </div>
  );
};
