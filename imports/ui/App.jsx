import React from "react";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../api/TasksCollection.js";
import { useTracker } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm.jsx";

export function App() {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

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
            <h1>📝️ Todo list</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />
        <ul>
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
