import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
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
  const [data, setData] = useState([]);
  const apiUrl = "https://dev-example.sanbercloud.com/api/job-vacancy";

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const currentPath = window.location.pathname;
  const id = currentPath.split("/").pop();

  const dataAxios = async () => {
    await axios
      .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`)
      .then((res) => {
        setData([res.data]);
        let data = res.data;
        setInput(
          {
            company_name: data.company_name,
            title: data.title,
            company_image_url: data.company_image_url,
            company_city: data.company_city,
            job_status: data.job_status,
            job_type: data.job_type,
            job_tenure: data.job_tenure,
            salary_min: data.salary_min,
            salary_max: data.salary_max,
            job_description: data.job_description,
            job_qualification: data.job_qualification,
          },
          {
            headers: {
              Authorization: `Bearer ${cokie}`,
            },
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataAxios();
  }, []);
  const cokie = Cookies.get("token");
  const navigate = useNavigate();
  const handleEdit = async (e) => {
    e.preventDefault();

    let {
      company_name,
      title,
      company_image_url,
      company_city,
      job_status,
      job_type,
      job_tenure,
      salary_min,
      salary_max,
      job_description,
      job_qualification,
    } = input;
    await axios
      .put(
        `${apiUrl}/${id}`,
        {
          company_name,
          title,
          company_image_url,
          company_city,
          job_status,
          job_type,
          job_tenure,
          salary_min,
          salary_max,
          job_description,
          job_qualification,
        },
        {
          headers: {
            Authorization: `Bearer ${cokie}`,
          },
        }
      )
      .then((res) => {
        alert("berhasil");
        navigate("/list-job-vacancy");
      });
  };
  return (
    <form className="sm:w-full md:mx-6 py-6" onSubmit={handleEdit}>
      <h1 className="font-bold mb-6 text-center">EDIT Job Vacancy</h1>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2  px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nama Perusahaan
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-cyan-500 rounded py-3 px-4 mb-3 "
            type="text"
            name="company_name"
            value={input.company_name}
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
            value={input.title}
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
            value={input.company_image_url}
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
            value={input.company_city}
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
              value={input.job_status}
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
            value={input.job_type}
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
            value={input.job_tenure}
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
            value={input.salary_min}
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
            value={input.salary_max}
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
            value={input.job_description}
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
            value={input.job_qualification}
            name="job_qualification"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  appearance-none  border border-cyan-500 rounded py-3 px-4 mb-3 "
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
  );
};

export default EditForm;
