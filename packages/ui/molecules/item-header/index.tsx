import type { FC } from "react";

import { Button } from "../button";
import { LinkButton } from "../link-button";

interface ButtonProps {
  disabled: boolean;
  onClickDelete: () => Promise<void>;
  title: string;
  editHref: string;
}

export const ItemHeader: FC<ButtonProps> = ({
  disabled,
  editHref,
  onClickDelete,
  title,
}) => {
  return (
    <div className="flex">
      <span>{title}</span>
      <div className="flex flex-1 justify-end gap-3">
        <LinkButton href={editHref}>Edit</LinkButton>
        <Button onClick={onClickDelete} disabled={disabled}>
          Delete
        </Button>
      </div>
    </div>
  );
};
