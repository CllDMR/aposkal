import { ReCaptchaProvider } from "../providers";

export default function Layout(props: { children: React.ReactNode }) {
  return <ReCaptchaProvider>{props.children}</ReCaptchaProvider>;
}
