import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(String);
  const [pwd, setPwd] = useState(String);

  const [err, setErr] = useState(String);
  const [pwderr, setPwdErr] = useState(String);

  useEffect(() => {
    var data: any = localStorage.getItem("Session");
    if (data) {
      data = JSON.parse(data);
      if (data.email && data.token) {
        navigate("/home");
      } else {
        localStorage.removeItem("Session");
      }
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!pwderr) {
      var payload = {
        email: email,
        password: pwd,
      };
      await axios
        .post("/users/login", payload)
        .then((res) => {
          if (res.data.message === "Login successfull") {
            setErr(res.data.message);
            delete res.data.message;
            localStorage.setItem("Session", JSON.stringify(res.data));
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="bg-gradient-to-r from-pink-200 to-sky-200 pt-56 min-h-screen">
      <div className="w-3/12 px-14 py-6 mx-auto bg-gray-700 rounded-lg">
        <h1 className="text-center text-white text-3xl font-bold my-2">
          Login
        </h1>
        {err && <div className="text-sm text-center text-red-500">{err}</div>}
        <form onSubmit={loginHandler}>
          <input
            type={"email"}
            placeholder={"Email"}
            required={true}
            className="outline-none h-12 w-full my-2 px-3 rounded-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder={"Password"}
            required={true}
            className="outline-none h-12 w-full my-2 px-3 rounded-lg"
            onChange={(e) => {
              setPwd(e.target.value);
              e.target.value.length < 7
                ? setPwdErr("Password should be >7 digits")
                : setPwdErr("");
            }}
          />
          {pwderr && (
            <div className="text-sm text-center text-red-500">{pwderr}</div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-400 text-center text-white font-bold h-12 text-xl my-2 rounded-lg"
          >
            Login
          </button>
          <p className="text-center text-xl text-white my-2">
            Dont have an account?
            <Link to="/register" className="text-blue-500">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
