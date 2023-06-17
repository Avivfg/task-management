import { FormWrapper } from "./FormWrapper";
import { Task, tasks } from "./components/Task";
// import { tasks } from "./api/index";
import { useState, FocusEvent } from "react";
import StatusDropdown from "./components/StatusDropdown";
import TaskDropdown from "./components/TaskDropdown";

type advancedInfo = {
  status: string;
  description: string;
  relatedTasks: Task[];
};

type SecondStepProps = advancedInfo & {
  updateFields: (fields: Partial<advancedInfo>) => void;
};

export function SecondStep({
  status,
  description,
  relatedTasks,
  updateFields,
}: SecondStepProps) {
  const [tasksToShow, setTasksToShow] = useState<Task[]>(
    tasks
      .filter((task) => relatedTasks.indexOf(task) < 0)
      .sort((a, b) => a.id - b.id)
  );
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const toggleTaskDropdown = () => setShowTaskDropdown(!showTaskDropdown);
  const taskSelection = (selected: Task): void => {
    setTasksToShow(tasksToShow.filter((task) => task.id !== selected.id));
    updateFields({ relatedTasks: [...relatedTasks, selected] });
  };
  const removeSelected = (removeTask: Task): void => {
    setTasksToShow(
      [...tasksToShow, removeTask].sort(function (a, b) {
        return a.id - b.id;
      })
    );
    updateFields({
      relatedTasks: relatedTasks.filter((task) => task.id !== removeTask.id),
    });
  };

  const statuses = ["Open", "In progress", "Done"];
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const toggleStatusDropdown = () => setShowStatusDropdown(!showStatusDropdown);

  const statusSelection = (status: string): void =>
    updateFields({ status: status });

  const dismissHandler = (e: FocusEvent<HTMLButtonElement>): void => {
    if (e.currentTarget === e.target) {
      setShowStatusDropdown(false);
      setShowTaskDropdown(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <FormWrapper title="Details">
        <label>Status</label>
        <button
          type="button"
          className={showStatusDropdown ? "active" : undefined}
          onClick={toggleStatusDropdown}
          onBlur={(e: FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
        >
          <div>{status ? status : "Select..."}</div>
          {showStatusDropdown && (
            <StatusDropdown
              statuses={statuses}
              showDropdown={false}
              toggleDropdown={toggleStatusDropdown}
              statusSelection={statusSelection}
            />
          )}
        </button>
        <label>Description</label>
        <input
          required
          type="text"
          value={description}
          onChange={(e) => updateFields({ description: e.target.value })}
        />
        <label>Related tasks</label>
        <button
          type="button"
          className={showTaskDropdown ? "active" : undefined}
          onClick={toggleTaskDropdown}
          onBlur={(e: FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
        >
          <div>
            {relatedTasks.length === 0
              ? "Select..."
              : tasksToShow.length === 0
              ? "<Empty>"
              : "Add"}
          </div>
          {showTaskDropdown && (
            <TaskDropdown
              tasks={tasksToShow}
              showDropdown={false}
              toggleDropdown={toggleTaskDropdown}
              taskSelection={taskSelection}
            />
          )}
        </button>
      </FormWrapper>{" "}
      <ul>
        {relatedTasks.map((task, i) => (
          <li key={i}>
            <div style={styles.relatedTask}>
              <div>
                <div style={styles.title}>{task.title}</div>
                <div>
                  {task.assignee?.name} . Creation date{" "}
                  {task.creationDate.toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {task.status && <div style={styles.status}>{task.status}</div>}
                <button
                  type="button"
                  className="Remove selected task"
                  onClick={() => removeSelected(task)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  relatedTask: {
    border: "1px solid black",
    padding: "0.5rem",
    margin: "1rem",
    borderRadius: ".5rem",
    width: "100%",
    display: "flex",
  },
  status: {
    border: "2px solid black",
    padding: "0.5rem",
    margin: "0.5rem",
    borderRadius: ".5rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
  },
};
