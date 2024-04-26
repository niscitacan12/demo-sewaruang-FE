import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const UpdateDataBookingTempat = () => {
    const { id } = useParams();
    const [jam_akhir, setJam_akhir] = useState("");
    const [jam_awal, setJam_awal] = useState("");
    const [jumlah_orang, setJumlah_orang] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [PelangganList, setPelangganList] = useState([]);
    const [nama_pelanggan, setNama_pelanggan] = useState("");
    const [Data_ruangList, setData_ruangList] = useState([]);
    const [tempat, setTempat] = useState("");
    const [menu_tambahList, setMenu_tambahList] = useState([]);
    const [nama_item, setNama_item] = useState("");

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
            } catch (error) {
                alert("Terjadi kesalahan Sir! " + error);
            }
        };

        fetchData();
    }, [id]);

    // getAllData pelanggan
    const fetchDataPelanggan = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `http://localhost:7000/api/pelanggan/all`,
                config
            );
            setPelangganList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // getAllData ruang
    const fetchDataRuang = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `http://localhost:7000/api/data_ruang/all`,
                config
            );
            setData_ruangList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // getAll menu tambah
    const fetchDataMenuTambahan = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `http://localhost:7000/api/menu_tambahan/all`,
                config
            );
            setMenu_tambahList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataPelanggan();
        fetchDataRuang();
        fetchDataMenuTambahan();
    }, []);


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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const payload = {
                jam_akhir,
                jam_awal,
                jumlah_orang,
                keterangan,
                tanggal,
                tempat,
                nama_item,
            };
            const response = await axios.put(
                `http://localhost:7000/api/data_tempat/${id}`,
                payload,
                config
            );
            console.log(response.data);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Edit Success!!",
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.href = "/peminjaman_tempat";
            // Redirect or show success message
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const batal = () => {
        window.location.href = "/peminjaman_tempat";
    };

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
                    <form onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nama Pelanggan
                            </label>
                            <select
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                required
                                value={nama_pelanggan} 
                                onChange={(e) => setNama_pelanggan(e.target.value)}
                                disabled
                            >
                                {/* Menambahkan opsi dari data pelanggan */}
                                {PelangganList.map((pelanggan) => (
                                    <option key={pelanggan.id} value={pelanggan.id}>
                                        {pelanggan.nama_pelanggan}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Ruang
                            </label>
                            <select
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                required
                                value={tempat} 
                                onChange={(e) => setTempat(e.target.value)}
                            >
                                {/* Menambahkan opsi dari data pelanggan */}
                                {Data_ruangList.map((dataRuang) => (
                                    <option key={dataRuang.id} value={dataRuang.id}>
                                        {dataRuang.tempat}
                                    </option>
                                ))}
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
                                required
                                value={nama_item} 
                                onChange={(e) => setNama_item(e.target.value)}
                            >
                                {/* Menambahkan opsi dari data pelanggan */}
                                {menu_tambahList.map((menuTambah) => (
                                    <option key={menuTambah.id} value={menuTambah.id}>
                                        {menuTambah.nama_item}
                                    </option>
                                ))}
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