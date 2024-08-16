import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InputForm = () => {
  // console.log(token);

  const navigate = useNavigate();

  const jobData = {
    company_name: "",
    title: "",
    company_image_url: "",
    company_city: "",
    job_status: "",
    job_type: "",
    job_tenure: "",
    salary_min: "",
    salary_max: "",
    job_description: "",
    job_qualification: "",
  };
  const [input, setInput] = useState({ ...jobData });
  const apiUrl = "https://dev-example.sanbercloud.com/api/job-vacancy";

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cokie = Cookies.get("token");

    await axios
      .post(
        apiUrl,
        {
          company_name: input.company_name,
          title: input.title,
          company_image_url: input.company_image_url,
          company_city: input.company_city,
          job_status: input.job_status,
          job_type: input.job_type,
          job_tenure: input.job_tenure,
          salary_min: input.salary_min,
          salary_max: input.salary_max,
          job_description: input.job_description,
          job_qualification: input.job_qualification,
        },
        {
          headers: {
            Authorization: `Bearer ${cokie}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Berhasil Ditambah!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/list-job-vacancy");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <form className="md:mx-6 py-6" onSubmit={handleSubmit}>
        <h1 className="font-bold mb-6 text-center">Input Job Vacancy</h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nama Perusahaan
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3 "
              type="text"
              name="company_name"
              placeholder="PT.Papoy"
              onChange={handleInput}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Title
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="text"
              name="title"
              placeholder="FE,BE Full Stack"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image Url
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="text"
              name="company_image_url"
              placeholder="https://placehold.co/600x400/000000/FFFFFF/png"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Kota
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="text"
              name="company_city"
              onChange={handleInput}
              placeholder="Jakarta"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
                name="job_status"
                onChange={handleInput}
              >
                <option>Buka/Tutup?</option>
                <option value="1">Dibuka</option>
                <option value="0">Ditutup</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="text"
              name="job_type"
              onChange={handleInput}
              placeholder="hybird"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Masa Kerja
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="text"
              name="job_tenure"
              onChange={handleInput}
              placeholder="Magang, Kontrak dll"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Salary Minimal
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="number"
              name="salary_min"
              onChange={handleInput}
              placeholder="2.000.00"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Salary Maximal
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3"
              type="number"
              name="salary_max"
              onChange={handleInput}
              placeholder="20.000.00"
            />
          </div>
        </div>
        <div className="flex flex-wrap my-4 -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="deskripsi"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Deskripsi:
            </label>
            <textarea
              rows="4"
              onChange={handleInput}
              name="job_description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  appearance-none  border border-cyan-500 rounded py-3 px-4 mb-3"
              placeholder="Masukkan Deskripsi Pekerjaan..."
            ></textarea>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="kualifikasi"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qualifikasi:
            </label>
            <textarea
              rows="4"
              onChange={handleInput}
              name="job_qualification"
              className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50  appearance-none  border border-cyan-500 rounded py-3 px-4 mb-3 "
              placeholder="Masukkan Kualifikasi Pekerjaan..."
            ></textarea>
          </div>
        </div>
        <div className="md:w-1/3 px-3 py-4 mb-6 md:mb-0">
          <input
            type="submit"
            className="border px-2 py-1 rounded-md bg-cyan-500 shadow-xl shadow-cyan-500/50 hover:bg-cyan-700"
          />
        </div>
      </form>
    </div>
  );
};

export default InputForm;
