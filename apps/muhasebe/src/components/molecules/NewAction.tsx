"use client";

import { MenuButton } from "@acme/ui/atoms";

const NewActionButton = () => {
  return (
    <div className="flex justify-end space-x-2 pb-2">
      <MenuButton
        title="Alış Ekle"
        items={[
          { name: "Fiş", href: `#` },
          { name: "e Arşiv (Gib)", href: `#` },
          { name: "Serbest Meslek Makbuzu", href: `#` },
          { name: "Matbu Fatura", href: `#` },

          { name: "Bordro", href: `#` },
          { name: "İthalat", href: `#` },
          { name: "Gider Pusulası", href: `#` },
          { name: "Sigorta Poliçesi", href: `#` },
          { name: "Diğer Faturasız Gider (Banka,Kira,Vergi)", href: `#` },
        ]}
      />
      <MenuButton
        title="Satış Ekle"
        items={[
          { name: "Fatura", href: `/income/invoice` },
          { name: "İhracat Faturası", href: `/income/export` },
          { name: "İade Faturası", href: `/income/return` },
          // { name: "Serbest Meslek Makbuzu", href: "#" },
          { name: "Z Raporu", href: `/income/zReport` },
        ]}
      />
    </div>
  );
};

export default NewActionButton;
