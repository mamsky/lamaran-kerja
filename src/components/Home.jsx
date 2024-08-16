import React, { useState, useEffect, Suspense } from "react";
import Foto from "../foto.png";
import NavBar from "./Utils/NavBar";
import { Link } from "react-router-dom";
import Footer from "./Utils/Footer";
import axios from "axios";

const api = "https://dev-example.sanbercloud.com/api/job-vacancy";

export const Home = () => {
  const [data, setData] = useState([]);
  const [noReload, setNoReload] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dataJob = async (searchTerm) => {
    await axios
      .get(`${api}?search=${searchTerm}`)
      .then((res) => {
        const filteredData = res.data.data.filter((job) => {
          return (
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.job_tenure.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setData(filteredData);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    dataJob(searchTerm);
  }, [noReload, setNoReload, searchTerm]);

  const handleJobStatus = (job_status) => {
    if (job_status === 1) {
      return (
        <div className="bg-cyan-500 border p-2 rounded-xl text-black">Open</div>
      );
    } else {
      return (
        <div className="bg-red-500 border p-2 rounded-xl text-white">
          Closed
        </div>
      );
    }
  };
  if (isLoading) {
    return "loading...";
  }

  return (
    <div className="">
      <NavBar className="fixed" />
      {/* Hero Section Start */}
      <div className="hero min-h-10 bg-base-200">
        <div>
          <div className="hero-content flex-col lg:flex-row">
            <img src={Foto} className="max-w-xs  rounded-lg" alt="foto" />
            <div>
              <h1 className="text-5xl font-bold font-serif">Lowongan Kerja</h1>
              <p className="py-6">
                Portal lowongan kerja Programer di Indonesia. Full Stack
                Programer
                <br />
                maupun Back End dan Front End, kami menyediakan berbagai jenis
                <br />
                pekerjaan yang sesuai dengan keahlian anda
              </p>

              <div className="max-w-44">
                <marquee direction="left">
                  Cari lowongan kerja berdasarkan Nama Perusahaan, jam kerja,
                  kota atau stack yang anda inginkan....
                </marquee>
              </div>
              <input
                type="search"
                placeholder="Search... "
                value={searchTerm}
                onChange={({ target }) => {
                  setSearchTerm(target.value);
                }}
                className="rounded-md p-1 focus:outline-none focus:border-teal-500 focus:ring-1"
              />
            </div>
          </div>
        </div>
        {/* Hero Section End */}
      </div>
      {/* Awal Card */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-6 pb-10">
        {data.length > 0 ? (
          data.map((job) => (
            <Suspense fallback={<h1>Loading....</h1>}>
              <div
                key={job.id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 shadow-cyan-500/50"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={job.company_image_url}
                  alt=""
                />
                <div className="flex flex-col p-4 leading-normal">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.company_name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {job.job_description.slice(0, 100)}...
                  </p>
                  <label htmlFor="kota" className="border w-44 pl-1 rounded-md">
                    {job.title}
                  </label>
                  <div className="flex justify-between pl-1">
                    <label htmlFor="kota" className="pb-2">
                      {job.company_city}
                      <br />
                      {job.job_tenure}
                    </label>
                    <div className="flex justify-end items-center space-x-2">
                      <Link to={`/detailjob/${job.id}`}>
                        <div className="flex">
                          <div className="p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                      <label htmlFor="status">
                        {handleJobStatus(job.job_status)}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          ))
        ) : (
          <p className="pl-10 text-red-500 text-xl font-bold hover:scale-105 cursor-pointer">
            Perusahaan, jam kerja, kota atau stack yang kamu inginkan tidak
            ada...
          </p>
        )}
      </div>

      {/* End Card */}
      <Footer />
    </div>
  );
};
