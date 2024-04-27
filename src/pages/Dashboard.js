import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { FaBuilding, FaCalendarCheck, FaUsers } from 'react-icons/fa'
import axios from 'axios';

const Dashboard = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [ruangan, setRuangan] = useState([]);
    const [data_booking_tempat, setData_booking_tempat] = useState([]);

    // getAllData pelanggan
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
   
            setPelanggan(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // getAllData ruangan
    const getAllDataRuangan = async () => {
        const token = localStorage.getItem("token");
   
        try {
            const response = await axios.get(
                `http://localhost:7000/api/data_ruang/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
   
            setRuangan(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // getAllData Sewa tempat
    const getAllDataBookingtempat = async () => {
        const token = localStorage.getItem("token");
   
        try {
            const response = await axios.get(
                `http://localhost:7000/api/data_tempat/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
   
            setData_booking_tempat(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllDataPelanggan();
        getAllDataRuangan();
        getAllDataBookingtempat();
    }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="w-full sm:w-4/5 p-4 sm:ml-4 overflow-y-auto bg-fixed bg-cover bg-center bg-fixed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-12 mx-auto max-w-7xl">
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaUsers className="absolute top-0 right-0 mt-4 mr-10 text-5xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Pelanggan 
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        {pelanggan.length}
                    </p>
                    <a href="/master_pelanggan" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        pergi ke
                    </a>
                </div>
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaCalendarCheck className="absolute top-0 right-0 mt-4 mr-10 text-5xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Sewa Tempat
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        {data_booking_tempat.length}
                    </p>
                    <a href="/peminjaman_tempat" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        pergi ke
                    </a>
                </div>
                <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative mb-8">
                    <FaBuilding className="absolute top-0 right-0 mt-4 mr-10 text-5xl text-gray-600 dark:text-gray-400" />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Ruang 
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="text-2xl tracking-tight text-gray-400 dark:text-white">
                        {ruangan.length}
                    </p>
                    <a href="/data_ruangan" 
                        className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-full hover:bg-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 float-right">
                        pergi ke
                    </a>
                </div>
            </div>

            {/* tabel pelanggan */}
            <div className="mb-4 mx-auto max-w-7xl">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-x-auto">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Identifikasi Pelanggan
                    </h5>
                    <hr className="my-4 w-full border-gray-300 dark:border-gray-600 overflow-x-auto" />
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
                            {pelanggan.slice(0, 5).map((dataUser, index) => (
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

            {/* tabel ruangan */}
            <div className="mb-4 mx-auto max-w-7xl">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-x-auto">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Data Tempat
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tempat
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nomor Ruangan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {ruangan.slice(0, 5).map((dataRuang, index) => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={index}
                                >
                                    <td
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {dataRuang.tempat}
                                    </td>
                                    <td className="px-6 py-4">{dataRuang.nomor_ruangan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* tabel sewa tempat */}
            <div className="mb-4 mx-auto max-w-7xl">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-x-auto">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
                        Sewa Ruangan
                    </h5>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Keterangan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tanggal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jumlah Orang
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data_booking_tempat.slice(0, 5).map((dataPeminjamanTempat, index) => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={index}
                                >
                                    <td
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {dataPeminjamanTempat.keterangan}
                                    </td>
                                    <td className="px-6 py-4">{dataPeminjamanTempat.tanggal}</td>
                                    <td className="px-6 py-4">{dataPeminjamanTempat.jumlah_orang}</td>
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