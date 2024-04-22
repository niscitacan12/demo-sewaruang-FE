import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { FaUsers } from 'react-icons/fa'
import axios from 'axios';

const Dashboard = () => {
    const [pelanggan, setPelanggan] = useState([]);

    const getAllDataPelanggan = async () => {
        const token = localStorage.getItem("token");
   
        try {
            const response = await axios.get(
                `http://localhost:7000/api/pelanggan/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
   
            setPelanggan(response.data.slice(0,5));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllDataPelanggan();
    }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="w-full sm:w-4/5 p-4 sm:ml-4">
            <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaUsers className="absolute top-0 right-0 mt-4 mr-10 text-6xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Customer 
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        110
                    </p>
                    <a href="#" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        Going to
                    </a>
                </div>
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaUsers className="absolute top-0 right-0 mt-4 mr-10 text-6xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Customer 
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        110
                    </p>
                    <a href="#" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        Going to
                    </a>
                </div>
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaUsers className="absolute top-0 right-0 mt-4 mr-10 text-6xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Customer 
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        110
                    </p>
                    <a href="#" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        Going to
                    </a>
                </div>
            </div>
            <div className="max-3 mb-4">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Identifikasi Pelanggan
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nama Pelanggan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No Telepon
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pelanggan.map((dataUser, index) => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={index}
                                >
                                    <td
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {dataUser.nama_pelanggan}
                                    </td>
                                    <td className="px-6 py-4">{dataUser.no_telepon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard