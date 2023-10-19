import type { FC, PropsWithChildren } from "react";
import { Children, useId, useState } from "react";

import { Card } from "../../atoms";
import { Button } from "../../molecules";

interface TabPanelProps extends PropsWithChildren {
  labels: string[];
  isSubmitting: boolean;
  hasTabNav?: boolean;
}

export const TabPanel: FC<TabPanelProps> = ({
  children,
  labels,
  isSubmitting,
  hasTabNav = true,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const key = useId();

  return (
    <div className="space-y-4">
      {hasTabNav && (
        <Card key={key} id={key} className="space-x-2">
          {labels.map((label, i) => (
            <Button
              key={key + "-" + i + "-" + "button"}
              type="button"
              onClick={() => {
                setCurrentTab(i);
              }}
            >
              {label}
            </Button>
          ))}
        </Card>
      )}
      {Children.map(children, (child, index) => {
        const key2 = useId();

        return (
          <Card
            key={key + "-" + index}
            id={key + "-" + index}
            className={currentTab === index ? "initial" : "hidden"}
          >
            {child}

            <div className="mt-4 flex justify-end space-x-4 border-t pt-4">
              <Button
                type="button"
                disabled={index <= 0}
                onClick={() => {
                  setCurrentTab(index - 1);
                }}
              >
                Previous
              </Button>

              {index + 1 >= Children.count(children) ? (
                <Button
                  key={key2 + "-" + index + "-" + "submit"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  key={key2 + "-" + index + "-" + "next"}
                  type="button"
                  disabled={index + 1 >= Children.count(children)}
                  onClick={() => {
                    setCurrentTab(index + 1);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
