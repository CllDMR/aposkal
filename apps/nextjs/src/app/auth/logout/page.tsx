import { CSRF_experimental } from "@acme/auth";

export default function LogoutPage() {
  return (
    <form className="" action={`/api/auth/signout`} method="post">
      <div className="hidden">
        <input
          hidden
          type="text"
          name="callbackUrl"
          id="callbackUrl"
          defaultValue="/"
        />
      </div>

      <button type="submit">Logout</button>
      <CSRF_experimental />
    </form>
  );
}
