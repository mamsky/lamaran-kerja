import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const tok = Cookies.get("token");
  console.log(tok);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const apiUrl = "https://dev-example.sanbercloud.com/api/change-password";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { current_password, new_password, new_confirm_password } = input;
    const token = Cookies.get("token");
    await axios
      .post(
        apiUrl,
        {
          current_password,
          new_password,
          new_confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Berhasil");
        Cookies.remove("token");
        navigate("/login"); // Redirect to home page after successful password change
      })
      .catch((err) => {
        if (new_password !== new_confirm_password) {
          alert("Kata sandi baru dan kata sandi konfirmasi tidak cocok.");
        } else {
          alert("Password Lama Anda salah.");
        }
      });
  };

  return (
    <div>
      <form
        action=""
        className="m-4 border p-6 rounded-md shadow-md shadow-cyan-500"
        onSubmit={handleSubmit}
      >
        <label>Change Password</label>
        <label
          className="block text-cyan-800 text-sm font-bold mt-2"
          htmlFor="password"
        >
          Password Lama
        </label>
        <input
          className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
          type="password"
          placeholder="Password"
          name="current_password"
          required
          onChange={handleChange}
        />
        <label
          className="block text-cyan-800 text-sm font-bold mt-2"
          htmlFor="password"
        >
          Password Baru
        </label>
        <input
          className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
          type="password"
          placeholder="password"
          name="new_password"
          required
          onChange={handleChange}
        />
        <label
          className="block text-cyan-800 text-sm font-bold mt-2"
          htmlFor="email"
        >
          Confirm Password
        </label>
        <input
          className="border focus:outline-none focus:border-teal-500 focus:ring-1 rounded-md w-full py-2 px-3 text-cyan-800 bg-transparent hover:scale-105"
          type="password"
          placeholder="password"
          name="new_confirm_password"
          required
          onChange={handleChange}
        />
        <input
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold my-4 py-2 px-4 rounded"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
