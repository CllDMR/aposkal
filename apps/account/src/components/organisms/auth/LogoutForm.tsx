import { logOutAction } from "@acme/action";
import { Button } from "@acme/ui/molecules";

export default function LogoutForm() {
  return (
    <form action={logOutAction}>
      <Button fullwidth type="submit">
        Çıkış Yap
      </Button>
    </form>
  );
}
