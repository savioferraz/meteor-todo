import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

export function TaskForm() {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!text) {
      return;
    }

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  }

  return (
    <form className="task-form">
      <input
        type="text"
        placeholder="Insert your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
}
