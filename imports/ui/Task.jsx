import React from "react";

export function Task({ task, onCheckboxClick, onDeleteClick }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteClick(task)}> X </button>
    </li>
  );
}
