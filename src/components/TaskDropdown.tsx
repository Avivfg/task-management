import { useState } from "react";
import { Task } from "./Task";

type TaskDropdownProps = {
  tasks: Task[];
  showDropdown: boolean;
  toggleDropdown: Function;
  taskSelection: Function;
};

export default function TaskDropdown({
  tasks,
  taskSelection,
}: TaskDropdownProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onClickHandler = (task: Task): void => {
    setShowDropdown(true);
    taskSelection(task);
  };

  return (
    <>
      <div className={showDropdown ? "dropdown" : "dropdown active"}>
        {tasks.map((task) => (
          <p key={task.id} onClick={() => onClickHandler(task)}>
            {task.title}
          </p>
        ))}
      </div>
    </>
  );
}
