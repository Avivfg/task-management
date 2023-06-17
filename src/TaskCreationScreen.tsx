import { useState, FormEvent } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { User } from "../src/components/User";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { Task, addNewTask, createTask } from "./components/Task";
// import { postTask } from "./api/index";

type FormData = {
  title: string;
  assignee: User | null;
  status: string;
  description: string;
  relatedTasks: Task[];
};

const INITIAL_DATA: FormData = {
  title: "",
  assignee: null,
  status: "",
  description: "",
  relatedTasks: [],
};

function TaskCreationScreen() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, back, next } =
    useMultistepForm([
      <FirstStep {...data} updateFields={updateFields} />,
      <SecondStep {...data} updateFields={updateFields} />,
    ]);

  var clicked = "";
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (clicked === "move") return isFirstStep ? next() : back();
    if (clicked === "finish") {
      addNewTask(
        data.title,
        data.assignee,
        data.status,
        data.description,
        data.relatedTasks
      );
      // postTask(
      //   createTask(
      //     data.title,
      //     data.assignee,
      //     data.status,
      //     data.description,
      //     data.relatedTasks
      //   )
      // );
    }
    alert("Successful Account Creation");
  }

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Ariel",
        maxWidth: "max-content",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Task creation
      </h1>
      <form name="taskCreation" onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          {isFirstStep && (
            <button type="submit" onClick={() => (clicked = "move")}>
              Next
            </button>
          )}
          <button type="submit" onClick={() => (clicked = "finish")}>
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskCreationScreen;
