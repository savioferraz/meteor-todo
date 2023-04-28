import React, { useState } from "react";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../api/TasksCollection.js";
import { useTracker } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm.jsx";

export function App() {
  const [toggleComplete, setToggleComplete] = useState(false);

  const toggleCompleteFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TasksCollection.find(toggleComplete ? toggleCompleteFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() => {
    TasksCollection.find(toggleCompleteFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  function handdleCheck({ _id, isChecked }) {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  }

  function handdleDelete({ _id }) {
    TasksCollection.remove(_id);
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ Todo list {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <div className="filter">
          <button onClick={() => setToggleComplete(!toggleComplete)}>
            {toggleComplete ? "Show all" : "Hide complete"}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={handdleCheck}
              onDeleteClick={handdleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
