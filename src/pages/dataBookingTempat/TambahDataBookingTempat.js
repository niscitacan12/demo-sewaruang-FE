import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2';
import axios from 'axios';

const TambahDataBookingTempat = () => {
    const [selectedPelanggan, setSelectedPelanggan] = useState("");
    const [pelanggan, setPelanggan] = useState([]);
    const [selectedTambahMenu, setSelectedTambahMenu] = useState("");
    const [tambahMenu, setTambahMenu] = useState([]);
    const [selectedDataRuang, setSelecteDataRuang] = useState("");
    const [dataRuang, setDataRuang] = useState([]);
    const [jam_akhir, setJam_akhir] = useState("");
    const [jam_awal, setJam_awal] = useState("");
    const [jumlah_orang, setJumlah_orang] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tanggal, setTanggal] = useState("");
 
    const addMenuTambah = async (e) => {
        e.preventDefault();
    
        const newMenuTambah = {
          pelangganModel: selectedPelanggan,
          tambahMenuModel: selectedTambahMenu,
          dataRuangModel: selectedDataRuang,
          jam_akhir,
          jam_awal,
          jumlah_orang,
          keterangan,
          tanggal,
        };
    
        // Mendapatkan token dari local storage
        const token = localStorage.getItem("token");
    
        try {
          // Menambahkan header Authorization dengan token ke dalam permintaan
          const response = await axios.post(
            `http://localhost:7000/api/data_tempat/add`,
            newMenuTambah,
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
            window.location.href = "/peminjaman_tempat";
          }, 1500);
        } catch (error) {
          console.error("Error adding :", error);
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

    // getAllData data pelanggan
    const getAllPelanggan = async () => {
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.get(`http://localhost:7000/api/pelanggan/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
    
            setPelanggan(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    // getAllData data ruang
    const getAllData_ruang = async () => {
            const token = localStorage.getItem("token");
            
            try {
                const response = await axios.get(`http://localhost:7000/api/data_ruang/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                },
            });
            
            setDataRuang(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // getAllData data menu tambahan
    const getAllData_MenuTambah = async () => {
            const token = localStorage.getItem("token");
            
            try {
                const response = await axios.get(`http://localhost:7000/api/menu_tambahan/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                },
            });
            
            setTambahMenu(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const batal = () => {
        window.location.href = "/peminjaman_tempat";
    };

    useEffect(() => {
        getAllPelanggan();
        getAllData_ruang();
        getAllData_MenuTambah();
    }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        {/* form tambah data booking  */}
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div className="max-w-4xl w-full mx-auto">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-600 dark:text-white">
                        TAMBAH SEWA RUANGAN
                    </h5>
                    <hr className="border-t-2 border-blue-500 mb-4" />  
                </div>
                <div className="p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={addMenuTambah}>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nama Pelanggan
                            </label>
                            <select
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                                value={selectedPelanggan ? selectedPelanggan.id : ""}
                                onChange={(e) =>
                                    setSelectedPelanggan({
                                    id: e.target.value,
                                    nama_pelanggan: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                                required
                            >
                                <option value="" disabled>
                                        Pilih Nama Pelanggan
                                    </option>
                                    {pelanggan.map((pelangganItem) => (
                                        <option key={pelangganItem.id} value={pelangganItem.id}>
                                        {pelangganItem.nama_pelanggan}
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
                                value={selectedDataRuang ? selectedDataRuang.id : ""}
                                onChange={(e) =>
                                    setSelecteDataRuang({
                                    id: e.target.value,
                                    tempat: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                                required
                            >
                                <option value="" disabled>
                                        Pilih Ruangan
                                    </option>
                                    {dataRuang.map((dataRuangItem) => (
                                        <option key={dataRuangItem.id} value={dataRuangItem.id}>
                                        {dataRuangItem.tempat}
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
                                value={selectedTambahMenu ? selectedTambahMenu.id : ""}
                                onChange={(e) =>
                                    setSelectedTambahMenu({
                                    id: e.target.value,
                                    nama_item: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                                required
                            >
                                <option value="" disabled>
                                        Pilih Menu Tambah
                                    </option>
                                    {tambahMenu.map((tambahMenuItem) => (
                                        <option key={tambahMenuItem.id} value={tambahMenuItem.id}>
                                        {tambahMenuItem.nama_item}
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
                                onChange={(e) => setJam_awal(e.target.value)}
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
                                onChange={(e) => setJam_akhir(e.target.value)}
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
                                onChange={(e) => setJumlah_orang(e.target.value)}
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
                                onChange={(e) => setTanggal(e.target.value)}
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
                                onChange={(e) => setKeterangan(e.target.value)}
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
                            {/* button kembali */}
                            <button
                                type="button"
                                onClick={batal}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-red-500 text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                            </button>
                            {/* button save  */}
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

export default TambahDataBookingTempat