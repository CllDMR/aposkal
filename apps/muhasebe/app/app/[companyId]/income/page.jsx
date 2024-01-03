import NewButton from "./NewButton";

const IncomeList = ({ params }) => {
  const companyId = params.companyId;
  const root = `/app/${companyId}`;
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
};

export default IncomeList;
