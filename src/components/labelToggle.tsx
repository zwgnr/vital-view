import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export const LabelToggle = (props: ToggleProps) => {
  const { enabled, setEnabled } = props;
  return (
    <Switch.Group as="div" className="flex items-center ">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Labels
        </span>
      </Switch.Label>
    </Switch.Group>
  );
};
