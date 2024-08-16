import axios from "axios";
import { useState } from "react";
import cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

const Register = () => {
  // const apiUrl = "https://dev-example.sanbercloud.com/api/register";
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    image_url: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      // Validate email
      if (!validator.isEmail(value)) {
        return;
      }
    }
    setInput({ ...input, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dev-example.sanbercloud.com/api/register",
        input
      );
      const { token } = response.data;
      cookie.set("token", token);
      // Redirect ke halaman lain atau lakukan sesuatu yang lain
      navigate(`/login`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="h-screen bg-cover bg-[url('https://cdn.wallpapersafari.com/90/19/rKHwW9.jpg')]">
        <div className="flex justify-center py-40 ">
          <div className="w-full max-w-xs border rounded border-teal-600 shadow-xl">
            <form className=" px-8 pt-6 pb-8 mb-4 " onSubmit={handleRegister}>
              <label
                className="block text-cyan-800 text-sm font-bold mb-2"
                htmlFor="Name"
              >
                Name
              </label>
              <input
                className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
                type="text"
                placeholder="Nama Lengkap"
                name="name"
                required
                onChange={handleInput}
              />
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
                onChange={handleInput}
                required
                name="email"
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
                onChange={handleInput}
                placeholder="********"
                name="password"
                required
              />
              <label
                className="block text-cyan-800 text-sm font-bold mb-2"
                htmlFor="image"
              >
                image_url
              </label>
              <input
                className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
                type="image_url"
                onChange={handleInput}
                placeholder="image_url"
                name="image_url"
                required
              />

              <div className="px-2 pt-4">
                <button
                  className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <label className=" text-white text-xs">
                Sudah Memiliki Akun?
                <Link to="/login">
                  <span className="text-blue-700 text-sm"> Login</span>
                </Link>
              </label>
            </form>
            <p className="text-center text-zinc-50 text-xs">
              ©2024 Paste Prosmana. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
