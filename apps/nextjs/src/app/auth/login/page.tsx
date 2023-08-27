import { CSRF_experimental } from "@acme/auth";

export default function LoginPage() {
  return (
    <form
      className=""
      action={`/api/auth/callback/credentials-login`}
      method="post"
    >
      <div className="hidden">
        <input
          hidden
          type="text"
          name="callbackUrl"
          id="callbackUrl"
          defaultValue="/auth/select-tenant"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit">Login</button>
      <CSRF_experimental />
    </form>
  );
}
