import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTodo from "../Components/EditTodo";
import Modal from "../Components/Modal/Modal";
import NewTodo from "../Components/NewTodo";
import Reminders from "../Components/Reminders";
import Todo from "../Components/Todo";

function Home() {
  const navigate = useNavigate();
  const [ntflag, setNtflag] = useState(false);
  const [etflag, setEtflag] = useState(false);
  const [todos, setTodos] = useState(Array);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterv, setFilterv] = useState(String);
  const [todo, setTodo] = useState(Object);
  const [remainders, setRemainders] = useState(Array);

  const fetchTodos = async () => {
    await axios
      .get("/todos/allTodos")
      .then((res) => {
        console.log(res.data);
        res.data.length ? setTodos(res.data.reverse()) : setTodos([]);
        filterTodos(filterv);
        setRemainders(
          todos.filter(
            (todo: any) =>
              new Date(todo.remindAt).getTime() - new Date().getTime() <=
              3 * 60 * 60 * 1000
          )
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    var data: any = localStorage.getItem("Session");
    if (data) {
      data = JSON.parse(data);
      if (!data.email || !data.token) {
        localStorage.removeItem("Session");
        navigate("/");
      }
    } else {
      navigate("/");
    }
    fetchTodos();
  }, [filter]);
  const deleteTodo = async (id: any) => {
    await axios
      .post(`/todos/deleteTodo`, { id: id })
      .then((res) => {
        fetchTodos();
        filterTodos("1");
        setFilterv("1");
      })
      .catch((err) => console.log(err));
  };
  const addTodo = async (todo: any, remind: any) => {
    var data = JSON.parse(localStorage.getItem("Session"));
    await axios
      .post(`/todos/newTodo`, {
        userId: data.token,
        title: todo,
        remindAt: remind,
      })
      .then((res) => {
        if (res.data) {
          setNtflag(!ntflag);
          fetchTodos();
          filterTodos("1");
          setFilterv("1");
        }
      })
      .catch((err) => console.log(err));
  };
  const setAsCompleted = async (id: any, bool: Boolean) => {
    await axios
      .post(`/todos/setAsCompleted`, { id: id, setAsCompleted: bool })
      .then((res) => {
        fetchTodos();
        filterTodos("1");
        setFilterv("1");
      })
      .catch((err) => console.log(err));
  };
  const filterTodos = (id: any) => {
    // console.log(id);
    switch (id) {
      case "1":
        setFiltered([]);
        setFilter(false);
        break;
      case "2":
        setFilter(true);
        setFiltered(
          todos.sort(
            (objB: any, objA: any) =>
              Number(new Date(objA.createdAt)) -
              Number(new Date(objB.createdAt))
          )
        );
        break;
      case "3":
        setFilter(true);
        setFiltered(
          todos.sort(
            (objA: any, objB: any) =>
              Number(new Date(objA.createdAt)) -
              Number(new Date(objB.createdAt))
          )
        );
        break;
      case "4":
        setFilter(true);
        setFiltered(todos.filter((t: any) => t.completed === true));
        break;
      case "5":
        setFilter(true);
        setFiltered(todos.filter((t: any) => t.completed !== true));
        break;
    }
  };
  const editTodo = async (id: any, todo: any, remind: any) => {
    // console.log(id, todo, remind);
    var payload = {
      id: id,
      title: todo,
      remindAt: remind,
    };
    await axios
      .post(`/todos/updateTodo`, payload)
      .then((res) => {
        // console.log(res.data);
        fetchTodos();
        setEtflag(false);
      })
      .catch((err) => console.log(err));
  };
  const Logout = () => {
    localStorage.removeItem("Session");
    navigate("/");
  };
  return (
    <div className="bg-gradient-to-r from-pink-200 to-sky-200 pt-6 min-h-screen">
      <div>
        <p className="text-center text-5xl pr-20 font-bold">Todos</p>
        <div className="flex justify-items-center items-center space-x-4 w-2/12 mx-auto">
          <div
            className="px-4 cursor-pointer bg-purple-400 text-white  mt-3 text-xl font-bold py-3 rounded-lg"
            onClick={() => setNtflag(true)}
          >
            New Todo
          </div>
          <div
            className="px-4 cursor-pointer bg-red-600 text-white  mt-3 text-xl font-bold py-3 rounded-lg"
            onClick={() => Logout()}
          >
            Logout
          </div>
        </div>
        {ntflag && (
          <Modal
            flag={ntflag}
            onClose={() => setNtflag(false)}
            component={<NewTodo addTodo={addTodo} />}
          />
        )}
      </div>
      {/* {JSON.stringify(remainders)} */}

      {remainders && (
        <div className="w-11/12 mx-auto my-4">
          <p className="text-xl font-bold">Remainders</p>
          {remainders.map((r: any) => (
            <Reminders key={r._id} r={r} />
          ))}
        </div>
      )}

      <div className="w-11/12 mx-auto text-xl font-bold ">
        Sort By:{" "}
        <select
          value={filterv}
          className="outline-none text-base px-1 py-1 rounded-md uppercase"
          onChange={(e) => {
            filterTodos(e.target.value);
            setFilterv(e.target.value);
          }}
        >
          <option value="1">all</option>
          <option value="2">New Todos</option>
          <option value="3">Old Todos</option>
          <option value="4">Compeleted</option>
          <option value="5">Not Compeleted</option>
        </select>
      </div>
      {todos && !filter
        ? todos.map((todo: any) => (
            <Todo
              key={todo._id}
              todo={todo}
              setEtflag={setEtflag}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
              setAsCompleted={setAsCompleted}
            />
          ))
        : filtered.map((todo: any, i: Number) => (
            <Todo
              key={i}
              todo={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
              setEtflag={setEtflag}
              setAsCompleted={setAsCompleted}
            />
          ))}
      {etflag && (
        <Modal
          flag={etflag}
          onClose={() => setEtflag(false)}
          component={<EditTodo todo={todo} editTodo={editTodo} />}
        />
      )}
    </div>
  );
}

export default Home;
