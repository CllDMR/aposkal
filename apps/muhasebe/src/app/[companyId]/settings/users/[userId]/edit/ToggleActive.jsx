import { Toggle } from "@/components/ui";

const ToggleActive = ({ isActive, setIsActive }) => {
  return (
    <div className="py-4 sm:my-2 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
      <label>Kullanıcı Durumu</label>
      <div className="col-span-2">
        <Toggle
          enabled={isActive}
          setEnabled={setIsActive}
          label={
            isActive
              ? "Kullanıcı Aktif"
              : "Kullanıcı Pasif firmanızın bilgilerine erişemez"
          }
        />
      </div>
    </div>
  );
};

export default ToggleActive;
