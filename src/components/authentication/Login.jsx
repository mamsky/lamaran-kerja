import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsCookie from "js-cookie";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password } = input;

    console.log(input);
    await axios
      .post("https://dev-example.sanbercloud.com/api/login", {
        email,
        password,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Selamat  Datang!",
          showConfirmButton: false,
          timer: 1500,
        });
        const data = res.data;
        jsCookie.set("token", data.token, { expires: 1 });
        navigate("/list-job-vacancy");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username atau Password Salah...",
          timer: 1500,
        });
      });
  };

  return (
    <div className="h-screen bg-cover bg-[url('https://cdn.wallpapersafari.com/90/19/rKHwW9.jpg')]">
      <div className="flex justify-center py-40 ">
        <div className="w-full max-w-xs border rounded border-teal-600 shadow-xl">
          <form className=" px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
            <label
              className="block text-cyan-800 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
              type="email"
              placeholder="Email@example.com"
              name="email"
              onChange={handleInput}
            />
            <label
              className="block text-cyan-800 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
              type="password"
              placeholder="********"
              name="password"
              onChange={handleInput}
            />

            <div className="flex items-center justify-between px-2 py-2">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Sign In
              </button>
              <Link
                to="/register"
                className=" bg-cyan-400 border hover:bg-cyan-500  py-2 px-4 rounded text-black font-bold"
              >
                register
              </Link>
            </div>
          </form>
          <p className="text-center text-zinc-50 text-xs">
            ©2024 Paste Prosmana. All rights reserved. papoy@gmail.com 123456
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
