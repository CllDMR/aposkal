import { CSRF_experimental } from "@acme/auth";

export default function RegisterPage() {
  return (
    <form
      className=""
      action={`/api/auth/callback/credentials-register`}
      method="post"
    >
      <div className="hidden">
        <input
          hidden
          type="text"
          name="callbackUrl"
          id="callbackUrl"
          defaultValue="/auth/verify-email-sent"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit">Register</button>
      <CSRF_experimental />
    </form>
  );
}
