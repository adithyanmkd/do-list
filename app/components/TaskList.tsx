import React from "react";

const TaskList = ({
  todos,
  onDelete,
  toggleInput,
  onChange,
  saveAndHide,
}: any) => {
  return (
    <ul className="space-y-3 mt-8">
      {todos.map((todo: any) => (
        <li className="flex items-center cursor-text space-x-4" key={todo.id}>
          <input
            type="checkbox"
            onChange={() => onDelete(todo.id, todo.text)}
            checked={false}
            className="checkbox"
          />
          {todo.isEdit ? (
            <div className="flex w-full justify-between">
              <input
                className="bg-[#1E2329] border-none focus:outline-none"
                type="text"
                autoFocus
                value={todo.text}
                onChange={(event) => onChange(todo.id, event)}
              />
              <button onClick={() => saveAndHide(todo.id)}>Save</button>
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <p className="select-none">{todo.text}</p>
              <button onClick={() => toggleInput(todo.id)}>Edit</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
