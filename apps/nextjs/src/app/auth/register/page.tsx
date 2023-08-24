import { CSRF_experimental } from "@acme/auth";

export default function RegisterPage() {
  return (
    <form className="" action={`/api/auth/callback/credentials`} method="post">
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
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
