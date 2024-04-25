import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useActionData, useParams } from 'react-router-dom';
import axios from 'axios';


const UpdateDataBookingTempat = () => {
    const { id } = useParams();
    const [jam_akhir, setJam_akhir] = useState("");
    const [jam_awal, setJam_awal] = useState("");
    const [jumlah_orang, setJumlah_orang] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tanggal, setTanggal] = useState("");
    // const [selectedDataRuang, setSelecteDataRuang] = useState("");
    // const [tempatList, setTempatList] = useState([]);
    // const [nama_pelanggan, setNama_pelanggan] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
        
                const response = await axios.get(
                  `http://localhost:7000/api/data_tempat/peminjaman_tempat/${id}`,
                  config
                );
                const dataBookingTempat = response.data;
        
                // Mengisi state dengan data yang didapatkan dari API
                setJam_akhir(dataBookingTempat.jam_akhir);
                setJam_awal(dataBookingTempat.jam_awal);
                setJumlah_orang(dataBookingTempat.jumlah_orang);
                setKeterangan(dataBookingTempat.keterangan);
                setTanggal(dataBookingTempat.tanggal);
                // setSelecteDataRuang(dataBookingTempat.dataRuangModel.id);
                // setNama_pelanggan(dataBookingTempat.nama_pelanggan);
            } catch (error) {
                alert("Terjadi kesalahan Sir! " + error);
            }
        };

        fetchData();
    }, [id]);

    const jam_akhirChangeHandler = (event) => {
        setJam_akhir(event.target.value);
    }
    const jam_awalChangeHandler = (event) => {
        setJam_awal(event.target.value);
    }
    const jumlah_orangChangeHandler = (event) => {
        setJumlah_orang(event.target.value);
    }
    const keteranganChangeHandler = (event) => {
        setKeterangan(event.target.value);
    }
    const tanggalChangeHandler = (event) => {
        setTanggal(event.target.value);
    }
    // const data_ruangChangeHandler = (event) => {
    //     setSelecteDataRuang(event.target.value);
    // }

    // const getAllDataRuang = async () => {
    //     const token = localStorage.getItem("token");

    //     try {
    //         const response = await axios.get(`http://localhost:7000/api/data_ruang/all`, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });

    //         setTempatList(response.data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const batal = () => {
        window.location.href = "/peminjaman_tempat";
    };

    // useEffect(() => {
    //     getAllDataRuang();
    // }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div className="max-w-4xl w-full mx-auto">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-600 dark:text-white">
                        UBAH SEWA RUANG
                    </h5>
                    <hr className="border-t-2 border-blue-500 mb-4" />  
                </div>
                <div className="p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="nama_pelanggan"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                // value={jam_awal}
                                // onChange={(e) => setJam_awal(e.target.value)}
                                required
                                readOnly
                            />
                            <label
                                htmlFor="time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nama Pelanggan
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Ruang
                            </label>
                            <select
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                id="data_ruang"
                                name="data_ruang"
                                autoComplete="tempat"
                                // value={selectedDataRuang}
                                // onChange={data_ruangChangeHandler}
                                required
                            >
                                {/* <option value="" disabled>
                                        Pilih Ruangan
                                    </option>
                                    {tempatList.map((dataRuangItem) => (
                                        <option key={dataRuangItem.id} value={dataRuangItem.id}>
                                        {dataRuangItem.tempat}
                                        </option>
                                ))} */}
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Menu Tambah
                            </label>
                            <select
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                // id="menu_tambah"
                                // name="menu_tambah"
                                // autoComplete="item-nama"
                                // value={selectedTambahMenu}
                                // onChange={tambah_menuChangeHandler}
                                required
                            >
                                {/* <option value="" disabled>
                                        Pilih Menu Tambah
                                    </option>
                                    {nama_itemList.map((Menu_tambahItem) => (
                                        <option key={Menu_tambahItem.id} value={Menu_tambahItem.id}>
                                        {Menu_tambahItem.nama_item}
                                        </option>
                                ))} */}
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="time"
                                name="jam_awal"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={jam_awal}
                                onChange={jam_awalChangeHandler}
                                required
                            />
                            <label
                                htmlFor="time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Jam Awal
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="time"
                                name="jam_akhir"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={jam_akhir}
                                onChange={jam_akhirChangeHandler}
                                required
                            />
                            <label
                                htmlFor="time"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Jam Akhir
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="jumlah_orang"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={jumlah_orang}
                                onChange={jumlah_orangChangeHandler}
                                required
                            />
                            <label
                                htmlFor="number"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Jumlah Orang
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="date"
                                name="tanggal"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={tanggal}
                                onChange={tanggalChangeHandler}
                                required
                            />
                            <label
                                htmlFor="date"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Tanggal
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="keterangan"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                placeholder=""
                                autoComplete="off"
                                value={keterangan}
                                onChange={keteranganChangeHandler}
                                required
                            />
                            <label
                                htmlFor="text"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Keterangan
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
  );
};

export default UpdateDataBookingTempat