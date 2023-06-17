import { FormWrapper } from "./FormWrapper";
import { User, users } from "../src/components/User";
import { useState, FocusEvent } from "react";
import Dropdown from "./components/AssigneeDropdown";

type BasicInfo = {
  title: string;
  assignee: User | null;
};
type FirstStepProps = BasicInfo & {
  updateFields: (fields: Partial<BasicInfo>) => void;
};

export function FirstStep({ title, assignee, updateFields }: FirstStepProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const userSelection = (user: User): void => updateFields({ assignee: user });

  const dismissHandler = (e: FocusEvent<HTMLButtonElement>): void => {
    if (e.currentTarget === e.target) setShowDropdown(false);
  };

  return (
    <FormWrapper title="Basic Info">
      <label>Title</label>
      <input
        autoFocus
        required
        type="text"
        value={title}
        onChange={(e) => updateFields({ title: e.target.value })}
      />
      <label>Assign to </label>
      <button
        type="button"
        className={showDropdown ? "active" : undefined}
        onClick={toggleDropdown}
        onBlur={(e: FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
      >
        <div>{assignee ? assignee.name : "Unassigned"}</div>
        {showDropdown && (
          <Dropdown
            users={users.sort((a, b) => (a.name > b.name ? 1 : -1))}
            showDropdown={false}
            toggleDropdown={toggleDropdown}
            userSelection={userSelection}
          />
        )}
      </button>
    </FormWrapper>
  );
}
