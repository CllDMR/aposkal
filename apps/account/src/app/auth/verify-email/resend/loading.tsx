import { Loading } from "@acme/ui/molecules";
import { LayoutSlim } from "@acme/ui/templates";

import backgroundImage from "../../../../public/images/background-auth.jpg";

export default function LoadingPage() {
  return (
    <LayoutSlim backgroundImage={backgroundImage}>
      <Loading />
    </LayoutSlim>
  );
}
