"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { useSaleOfferPDFTemplateFromValues } from "~/utils/useSaleOfferPDFTemplate";

interface SaleOfferCardProps {
  saleOffer: RouterOutputs["saleOffer"]["getWithProductsAndNotes"];
  id: NonNullable<RouterOutputs["saleOffer"]["getWithProductsAndNotes"]>["id"];
}

export const SaleOfferCard: FC<SaleOfferCardProps> = ({
  saleOffer: initialSaleOffer,
  id,
}) => {
  const context = api.useContext();
  const [saleOffer] = api.saleOffer.getWithProductsAndNotes.useSuspenseQuery(
    { id },
    {
      initialData: initialSaleOffer,
    },
  );

  const { mutateAsync, isLoading } = api.saleOffer.delete.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
      await context.saleOffer.get.invalidate();
    },
  });

  const [tenant] = api.tenant.getWithAddress.useSuspenseQuery();
  const [company] = api.company.get.useSuspenseQuery({
    id: saleOffer.companyId,
  });

  const { pdfData } = useSaleOfferPDFTemplateFromValues({
    address: saleOffer.toAddress,
    company,
    tenant,
    values: saleOffer,
  });

  return (
    <div className="">
      <div>
        <span className="pr-4">No: {saleOffer.no}</span>
        <LinkButton href={`/sale-offers/${saleOffer.id}/edit`}>Edit</LinkButton>
        <Button
          onClick={async () => await mutateAsync(saleOffer.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
      <div className="">
        <p className="">
          <span className="">Company Name: </span>
          <span className="">{saleOffer.company.title}</span>
        </p>
        <p className="">
          <span className="">To Address: </span>
          <span className="">{saleOffer.toAddress.city}</span>
        </p>
      </div>
      <div className="">
        {pdfData ? (
          <iframe
            title="PDF Viewer"
            src={`data:application/pdf;base64,${pdfData}`}
            className="h-screen sm:w-full"
          ></iframe>
        ) : (
          <span className="">No pdf data</span>
        )}
      </div>
    </div>
  );
};
