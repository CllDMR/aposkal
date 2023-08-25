import { CSRF_experimental } from "@acme/auth";

export default function LogoutPage() {
  return (
    <form className="" action={`/api/auth/signout`} method="post">
      <button type="submit">Logout</button>
      <CSRF_experimental />
    </form>
  );
}
