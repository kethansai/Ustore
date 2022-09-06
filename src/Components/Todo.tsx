import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function Todo(props) {
  const [todo, setTodo] = useState(Object);
  useEffect(() => {
    setTodo(props.todo);
  }, [props.todo]);

  return (
    <div
      className={`flex justify-between items-center px-10 py-4 my-2 w-11/12 mx-auto rounded-lg text-white font-semibold capitalize ${
        todo.completed ? "bg-green-400" : "bg-red-300"
      }`}
    >
      <div>{todo.title}</div>
      <div className="flex justify-around items-center w-40">
        <div className="flex">
          <p>completed </p>
          <input
            className="ml-3"
            type="checkbox"
            checked={todo.completed}
            onChange={() => props.setAsCompleted(todo._id, !todo.completed)}
          />
        </div>
        <FontAwesomeIcon
          onClick={() => {
            props.setEtflag(true);
            props.setTodo(todo);
          }}
          icon={faPenToSquare}
          className="text-sky-500 cursor-pointer"
        />
        <FontAwesomeIcon
          onClick={() => props.deleteTodo(todo._id)}
          icon={faTrashAlt}
          className="text-red-900 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Todo;
