import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

const DeleteForm = () => {
  const [input, setInput] = useState({
    id: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    const cokie = Cookies.get("token");
    let { id } = input;
    await axios
      .delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`, {
        headers: {
          Authorization: `Bearer ${cokie}`,
        },
      })
      .then((res) => {
        alert("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>ID</h1>

      <form onClick={handleDelete}>
        <input type="text" name="id" placeholder="id" onChange={handleInput} />
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default DeleteForm;
