import { useState } from "react";

type AssigneeDropdownProps = {
  statuses: string[];
  showDropdown: boolean;
  toggleDropdown: Function;
  statusSelection: Function;
};

export default function AssigneeDropdown({
  statuses,
  statusSelection,
}: AssigneeDropdownProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClickHandler = (status: string): void => {
    setShowDropdown(true);
    statusSelection(status);
  };

  return (
    <>
      <div className={showDropdown ? "dropdown" : "dropdown active"}>
        {statuses.map((status) => (
          <p key={status} onClick={() => onClickHandler(status)}>
            {status}
          </p>
        ))}
      </div>
    </>
  );
}
