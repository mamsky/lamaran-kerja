import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "./Utils/NavBar";
import Footer from "./Utils/Footer";

const DetailJob = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isReload, setIsReload] = useState(true);

  const url = `https://dev-example.sanbercloud.com/api/job-vacancy`;

  const dataId = async () => {
    if (isReload === true) {
      await axios
        .get(`${url}/${id}`)
        .then((res) => {
          setData([res.data]);
        })
        .catch((err) => console.log("Error : ", err));
      setIsReload(false);
    }
  };

  useEffect(() => {
    dataId();
  });

  const handleJobStatus = (job_status) => {
    if (job_status === 1) {
      return (
        <div className="flex">
          <div className="bg-red-500 border p-2 rounded-xl text-black line-through">
            Ditutup
          </div>
          <div className="bg-cyan-500 border p-2 rounded-xl text-black">
            Dibuka
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <div className="bg-red-500 border p-2 rounded-xl text-white">
            Ditutup
          </div>
          <div className="bg-cyan-500 border p-2 rounded-xl text-black line-through">
            Dibuka
          </div>
        </div>
      );
    }
  };

  const nf = new Intl.NumberFormat(); //mengatur  format angka
  const harga = (salary_min, salary_max) => {
    if (salary_min !== 0) {
      return `Rp. ${nf.format(salary_min)}`;
    } else if (salary_max !== 0) {
      return `Rp. ${nf.format(salary_max)}`;
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-screen mb-80">
        {data.map((res, i) => {
          return (
            <div
              className="flex flex-col mx-auto max-w-4xl mt-10 pb-10 shadow-md"
              key={i}
            >
              <div className=" flex justify-between border bg-orange-400 p-2 rounded-t-xl">
                <img
                  className="object-cover max-w-24 max-h-24 rounded-full shadow-md "
                  src={res.company_image_url}
                  alt=""
                />
              </div>
              <div className="pt-2 pl-6">
                <h2 className="mb-2 underline text-3xl font-bold font-serif tracking-tight text-gray-900 dark:text-white">
                  {res.company_name}
                </h2>
                <h2 className="mb-4 font-mono text-2xl">{res.title}</h2>
                <div className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Kota: {res.company_city}
                  </label>
                </div>
                <div className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Jam Kerja: {res.job_tenure}, {res.job_type}
                  </label>
                </div>
                <div className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>

                  <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Salary: {harga(res.salary_min)} - {harga(res.salary_max)}
                  </label>
                </div>
                <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {handleJobStatus(res.job_status)}
                </label>
                <div className="my-4">
                  <Link to="/" className="font-bold underline px-2">
                    Lihat Perusahaan Lain....
                  </Link>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Description" className="font-bold">
                    {" "}
                    Description:{" "}
                  </label>
                  <ul className="list-disc list-inside text-gray-700 ml-3">
                    {res.job_description.split("\n").map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-lg">Qualification:</label>
                  <ul className="list-disc list-inside text-gray-700 ml-3">
                    {res.job_qualification.split("\n").map((item, index) => (
                      <li key={index} className="list-none">
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer className="fixed" />
    </>
  );
};

export default DetailJob;
