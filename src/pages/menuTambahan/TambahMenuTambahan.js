import React, { useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import Sidebar from '../../components/Sidebar'
import Swal from 'sweetalert2';
import axios from 'axios';

const TambahMenuTambahan = () => {
    const [nama_item, setNama_item] = useState("");
    const [jenis, setJenis] = useState("");
    const [satuan_peminjaman, setSatuan_peminjaman] = useState("");

    const addMenuTambahan = async (e) => {
        e.preventDefault();

        const newMenuTambahan = {
            nama_item,
            jenis,
            satuan_peminjaman
        };

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `http://localhost:7000/api/menu_tambahan/add`, 
                newMenuTambahan, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil menambahkan",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                window.location.href = "/menu_tambahan";
            }, 1500);
        } catch (error) {
            console.error("Error adding:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Terjadi Kesalahan!",
              text: "Mohon coba lagi",
              showConfirmButton: false,
              timer: 1500,
            });
        }
    };

    const batal = () => {
        window.location.href = "/menu_tambahan";
    };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div className="max-w-4xl w-full mx-auto">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-600 dark:text-white">
                        TAMBAH DATA BOOKING
                    </h5>
                    <hr className="border-t-2 border-blue-500 mb-4" />  
                </div>
                <div className="p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={addMenuTambahan}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="nama_item"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={nama_item}
                                onChange={(e) => setNama_item(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="text"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nama Item
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="jenis"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={jenis}
                                onChange={(e) => setJenis(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="text"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Jenis
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="satuan_peminjaman"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={satuan_peminjaman}
                                onChange={(e) => setSatuan_peminjaman(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="number"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Satuan
                            </label>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={batal}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-red-500 text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-[#0b409c] text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaSave className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TambahMenuTambahan