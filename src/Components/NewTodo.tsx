import React, { useState } from "react";
import axios from "axios";

function NewTodo(props) {
  const [err, setErr] = useState(String);
  const [todo, setTodo] = useState(String);
  const [remind, setRemind] = useState(Date);

  const todoHandler = async (e) => {
    e.preventDefault();
    props.addTodo(todo, remind);
  };
  return (
    <div className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 px-14 py-6 mt-40 mx-auto bg-gray-700 rounded-lg">
      <h1 className="text-center text-white text-3xl font-bold my-2">
        New Todo
      </h1>
      {err && <div className="text-sm text-center text-red-500">{err}</div>}
      <form onSubmit={todoHandler}>
        <input
          type={"text"}
          placeholder={"Title"}
          required={true}
          className="outline-none h-12 w-full my-2 px-3 rounded-lg"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <input
          type={"datetime-local"}
          placeholder={"Remind at"}
          required={true}
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
          Create
        </button>
      </form>
    </div>
  );
}

export default NewTodo;
