"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

import { useSaleOfferPDFTemplateFromValues } from "~/utils/useSaleOfferPDFTemplate";

interface SaleOfferCardProps {
  saleOffer: RouterOutputs["saleOffer"]["getWithProductsAndNotes"];
  id: NonNullable<RouterOutputs["saleOffer"]["getWithProductsAndNotes"]>["id"];
}

export const SaleOfferCard: FC<SaleOfferCardProps> = ({
  saleOffer: initialSaleOffer,
  id,
}) => {
  const utils = api.useUtils();
  const [saleOffer] = api.saleOffer.getWithProductsAndNotes.useSuspenseQuery(
    { id },
    {
      initialData: initialSaleOffer,
    },
  );

  const { mutateAsync, isLoading } = api.saleOffer.delete.useMutation({
    async onSettled() {
      await utils.saleOffer.list.invalidate();
      await utils.saleOffer.get.invalidate();
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
      <ItemHeader
        disabled={isLoading}
        editHref={`/sale-offers/${saleOffer.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(saleOffer.id))}
        title={saleOffer.no.toString()}
      />

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
