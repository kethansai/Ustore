import React, { useState, useEffect } from "react";

function EditTodo(props) {
  const [todo, setTodo] = useState(props.todo.title);
  const [remind, setRemind] = useState(props.todo.remindAt);
  const todoHandler = (e) => {
    e.preventDefault();
    props.editTodo(props.todo._id, todo, remind);
  };
  return (
    <div className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 px-14 py-6 mt-40 mx-auto bg-gray-700 rounded-lg">
      <h1 className="text-center text-white text-3xl font-bold my-2">
        Update Todo
      </h1>
      <form onSubmit={todoHandler}>
        <input
          type={"text"}
          placeholder={"Title"}
          required={true}
          value={todo}
          className="outline-none h-12 w-full my-2 px-3 rounded-lg"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <input
          type={"datetime-local"}
          placeholder={"Remind at"}
          required={true}
          value={remind}
          min={new Date().toISOString()}
          className="outline-none h-12 w-full my-2 px-3 rounded-lg"
          onChange={(e) => {
            setRemind(e.target.value);
          }}
        />
        <button
          type="submit"
          className="w-full bg-purple-400 text-center text-white font-bold h-12 text-xl my-2 rounded-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
