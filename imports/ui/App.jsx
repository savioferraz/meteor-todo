import React, { Fragment, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../api/TasksCollection.js";
import { useTracker } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";

export function App() {
  const [toggleComplete, setToggleComplete] = useState(false);

  const toggleCompleteFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...toggleCompleteFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      toggleComplete ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(toggleCompleteFilter).count();
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
            <h1>
              📝️ Todo list
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={() => Meteor.logout()}>
              {user.username} 🚪
            </div>

            <TaskForm user={user} />

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
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
