import { useState } from "react";
import { User } from "./User";

type AssigneeDropdownProps = {
  users: User[];
  showDropdown: boolean;
  toggleDropdown: Function;
  userSelection: Function;
};

export default function AssigneeDropdown({
  users,
  userSelection,
}: AssigneeDropdownProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClickHandler = (user: User): void => {
    setShowDropdown(true);
    userSelection(user);
  };

  return (
    <>
      <div className={showDropdown ? "dropdown" : "dropdown active"}>
        {users.map((user) => (
          <p key={user.id} onClick={() => onClickHandler(user)}>
            {user.name}
          </p>
        ))}
      </div>
    </>
  );
}
