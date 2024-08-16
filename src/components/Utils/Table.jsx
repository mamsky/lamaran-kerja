import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Table = () => {
  const [data, setData] = useState([]);
  //   const [noReload, setNoReload] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const nf = new Intl.NumberFormat();

  const api = "https://dev-example.sanbercloud.com/api/job-vacancy";
  const dataJob = async () => {
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
        // const result = res.data;
        // console.log(res.data);
        // setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [noReload, setNoReload] = useState(true);
  useEffect(() => {
    if (noReload === true) {
      dataJob(searchTerm);
      setNoReload(true);
    }
  }, [noReload, setNoReload, searchTerm]);

  const handleJobStatus = (job_status) => {
    if (job_status === 1) {
      return <div className="p-2 text-black">Open</div>;
    } else {
      return <div className=" p-2 text-black">Closed</div>;
    }
  };

  const handleDelete = async (e) => {
    let dataId = parseInt(e.target.value);
    const cokie = Cookies.get("token");

    Swal.fire({
      title: "Ingin Menghapus Data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus Data",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `https://dev-example.sanbercloud.com/api/job-vacancy/${dataId}`,
            {
              headers: {
                Authorization: `Bearer ${cokie}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Data Berhasil Dihapus.",
              icon: "success",
            });
            setNoReload(true);
          });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto mx-4 my-4 rounded-t-xl">
        <div className="flex justify-start">
          <input
            type="search"
            placeholder="Search... "
            value={searchTerm}
            onChange={({ target }) => {
              setSearchTerm(target.value);
            }}
            className="my-4 text-black border rounded-md p-1 focus:outline-none focus:border-teal-500 focus:ring-1"
          />
        </div>
        <table className=" w-full text-sm rtl:text-right text-gray-500 border shadow-md shadow-cyan-500/50 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="w-10 text-center">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                Kota
              </th>
              <th scope="col" className="w-16 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((job, i) => (
                <tr
                  key={i}
                  className="mx-auto odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="text-center">{i + 1}</td>
                  <th
                    scope="row"
                    className=" border font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {job.company_name}
                  </th>
                  <td className="px-2 border w-40">{job.title}</td>
                  <td className="px-2 border w-32">{job.company_city}</td>
                  <td className="text-center border">
                    {handleJobStatus(job.job_status)}
                  </td>
                  <td className=" border w-44 px-1">
                    {job.job_description.slice(0, 20)}..
                  </td>
                  <td className="text-center border w-52">
                    Rp {nf.format(job.salary_min)} - {nf.format(job.salary_max)}
                  </td>
                  <td className="border">
                    {job.company_image_url.slice(0, 20)}...
                  </td>
                  <td className="px-6 py-4 flex flex-row justify-center gap-2">
                    <Link
                      to={`/dashboard/list-job-vacancy/edit/${job.id}`}
                      className="font-medium text-white bg-cyan-500 py-1 px-2 rounded-md hover:bg-cyan-700 shadow-md"
                    >
                      Edit
                    </Link>
                    <button
                      value={job.id}
                      onClick={handleDelete}
                      className="font-medium text-white bg-red-500 py-1 px-2 rounded-md hover:bg-red-700 shadow-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="pl-4 text-cyan-500 text-sm font-bold font-serif hover:scale-105 cursor-pointer"
                >
                  Perusahaan, jam kerja, kota atau stack yang kamu inginkan
                  tidak ada...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
