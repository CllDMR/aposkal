import type { FC } from "react";

import { LinkButton } from "../../molecules";

interface CreateNewSectionProps {
  href: string;
  label: string;
}

export const CreateNewSection: FC<CreateNewSectionProps> = ({
  href,
  label,
}) => (
  <div className="flex justify-end">
    <LinkButton href={href}>{label}</LinkButton>
  </div>
);
