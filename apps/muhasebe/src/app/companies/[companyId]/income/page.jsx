import { NewButton } from "@/components/company-income/NewButton";

export default function IncomeList() {
  return (
    <div>
      <div className="flex justify-between">
        <div> </div>

        <div>
          <NewButton
            items={[
              { name: "Fatura", href: `income/invoice` },
              { name: "İhracat Faturası", href: "#" },
              { name: "Serbest Meslek Makbuzu", href: "#" },
              { name: "Z Raporu", href: "#" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
