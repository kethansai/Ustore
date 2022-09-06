import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(String);
  const [pwd, setPwd] = useState(String);
  const [cpwd, setCpwd] = useState(String);

  const [err, setErr] = useState(String);
  const [pwderr, setPwdErr] = useState(String);
  const [cpwderr, setcPwdErr] = useState(String);

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

  const registerHandler = async (e) => {
    e.preventDefault();
    setErr("");
    if (!pwderr && !cpwderr) {
      if (pwd === cpwd) {
        var payload = {
          email: email,
          password: pwd,
        };
        await axios
          .post("/users/register", payload)
          .then((res) => {
            console.log(res);
            if (res.data._id) {
              setErr("Registered Successfully");
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
            if (res.data.message) {
              setErr(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setErr("Password mismatch!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 to-sky-200 pt-56 min-h-screen">
      <div className="w-3/12 px-14 py-6 mx-auto bg-gray-700 rounded-lg">
        <h1 className="text-center text-white text-3xl font-bold my-2">
          {" "}
          Register{" "}
        </h1>
        {err && <div className="text-sm text-center text-red-500">{err}</div>}
        <form onSubmit={registerHandler}>
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
          <input
            type={"password"}
            placeholder={"Confirm password"}
            required={true}
            className="outline-none h-12 w-full my-2 px-3 rounded-lg"
            onChange={(e) => {
              setCpwd(e.target.value);
              e.target.value.length < 7
                ? setcPwdErr("Password should be >7 digits")
                : setcPwdErr("");
            }}
          />
          {cpwderr && (
            <div className="text-sm text-center text-red-500">{cpwderr}</div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-400 text-center text-white font-bold h-12 text-xl my-2 rounded-lg"
          >
            Register
          </button>
          <p className="text-center text-xl text-white my-2">
            Already have an account?
            <Link to="/" className="text-blue-500">
              {" "}
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
