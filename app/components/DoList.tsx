"use client";

import React from "react";
import { useState } from "react";
import edit from "@/public/Edit.svg";
import Image from "next/image";
import TaskList from "./TaskList";

interface Todo {
  id: number;
  text: string;
  isEdit: boolean;
}

const DoList = () => {
  const [listId, setListId] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const [tasks, setTasks] = useState<Todo[]>([]);
  const [deletedTasks, setDeletedTask] = useState<Todo[]>([]);

  //input values setting to setInput state variable
  const onDataHandle = (event: any) => {
    setInputValue(event.target.value);
  };

  //add task
  const addTask = () => {
    if (inputValue) {
      setTasks([
        ...tasks,
        {
          id: listId,
          text: inputValue,
          isEdit: false,
        },
      ]);

      setInputValue("");
      setListId(listId + 1);
    }
  };

  // delete task;
  const deleteTask = (itemId: number, itemText: string) => {
    setTasks(tasks.filter((value) => value.id !== itemId));
    setDeletedTask([
      ...deletedTasks,
      {
        id: itemId,
        text: itemText,
        isEdit: false,
      },
    ]);
  };

  //show input and save btn
  const toggleInput = (id: number) => {
    console.log(id);
    setTasks(
      tasks.map((todo) => {
        if (todo.id == id) {
          return { ...todo, isEdit: true };
        } else {
          return todo;
        }
      })
    );
  };

  const onChange = (id: number, event: any) => {
    setTasks(
      tasks.map((todos) => {
        if (todos.id === id) {
          return { ...todos, text: event.target.value };
        } else {
          return todos;
        }
      })
    );
  };

  const saveAndHide = (id: number) => {
    setTasks(
      tasks.map((todos) => {
        if (todos.id === id) {
          return { ...todos, isEdit: false };
        } else {
          return todos;
        }
      })
    );
  };

  return (
    <div>
      <div className="w-full max-w-screen-sm my-20">
        {/* todo heading and underline */}
        <div>
          <h2 className="text-2xl font-semibold">Todo</h2>
          <div className="h-px w-full bg-gray-400"></div>
        </div>
        {/* heading and underline closed */}

        {/* input field and add button */}
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            value={inputValue}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={onDataHandle}
          />
          <button className="btn" onClick={addTask}>
            Add
          </button>
        </div>
        {/* input field and add button closed */}

        <TaskList
          todos={tasks}
          onDelete={deleteTask}
          toggleInput={toggleInput}
          onChange={onChange}
          saveAndHide={saveAndHide}
        />
        {/* list showing ended */}

        {/* deleted list showing */}
        <div className="mt-8">
          <ul className="space-y-3">
            <div className="h-px w-full bg-gray-400"></div>
            {deletedTasks.map((deletedValues) => (
              <li
                key={deletedValues.id}
                className="flex items-center space-x-4"
              >
                <input type="checkbox" defaultChecked className="checkbox" />
                <p className="select-none line-through decoration-1 font-light">
                  {deletedValues.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        {/* deleted list showing ended */}
      </div>
    </div>
  );
};

export default DoList;
