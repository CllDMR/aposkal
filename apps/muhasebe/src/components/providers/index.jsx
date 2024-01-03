import { AuthProvider } from "./auth";

export const Providers = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);
