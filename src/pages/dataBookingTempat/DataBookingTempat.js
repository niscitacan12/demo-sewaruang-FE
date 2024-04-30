import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { FaAngleLeft, FaAngleRight, FaInfo, FaPenSquare, FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const DataBookingTempat = () => {
    const [data_booking_tempat, setData_booking_tempat] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // get all data booking tempat
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

    // detele booking tempat
    const deleteBookingTempat = async (id) => {
        const token = localStorage.getItem("token");
    
        await Swal.fire({
          title: "Anda yakin?",
          text: "Yakin ingin menghapus data ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:7000/api/data_tempat/delete/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Berhasil Menghapus!!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                getAllDataBookingtempat();
              })
              .catch((error) => {
                console.error("Error deleting data:", error);
              });
          }
        });
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data_booking_tempat.filter((dataPeminjamanTempat) =>
    dataPeminjamanTempat.tanggal.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(data_booking_tempat.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
    };

    // Search 
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); 
    };

    useEffect(() => {
        getAllDataBookingtempat();
    }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100 dark:bg-gray-100">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <h5 className="mb-2 text-3x1 font-bold tracking-tight text-gray-600 dark:text-white text-center">
                SEWA RUANGAN
            </h5>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <div className="flex items-center justify-between">

                    {/* fitur search */}
                    <div className="flex items-center">
                        <FaSearch className="mr-2 text-gray-500" />
                        <input
                            type="text"
                            placeholder=""
                            value={searchTerm}
                            onChange={handleSearch}
                            className="px-3 py-2 border rounded-md"
                        />
                    </div>
                    <Link to={`/peminjaman_tempat/tambah_peminjaman_tempat`}>
                        <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                            <FaPlus className="z-20" title="Plus" />
                        </button>
                    </Link>
                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-left text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama Pelanggan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jam Awal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jam Akhir
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tanggal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentItems
                                .filter((dataPeminjamanTempat) =>
                                    dataPeminjamanTempat.tanggal
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                                ).map((dataPeminjamanTempat, index) => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    key={index}
                                >
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {dataPeminjamanTempat.pelangganModel
                                            ? dataPeminjamanTempat.pelangganModel.nama_pelanggan : ""
                                        }
                                    </td>
                                    <td className="px-6 py-4">{dataPeminjamanTempat.jam_awal}</td>
                                    <td className="px-6 py-4">{dataPeminjamanTempat.jam_akhir}</td>
                                    <td className="px-6 py-4">{dataPeminjamanTempat.tanggal}</td>
                                    <td className="whitespace-nowrap text-center py-2">
                                        <div className="flex items-center hover:space-x-1">
                                            <Link to={`/peminjaman_tempat/ubah_peminjaman_tempat/${dataPeminjamanTempat.id}`}>
                                            <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                                            >
                                                <FaPenSquare className="z-20" title="Edit" />
                                            </button>
                                            </Link>
                                            <Link  to={`/peminjaman_tempat/detail_peminjaman_tempat/${dataPeminjamanTempat.id}`}>
                                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                                                    <FaInfo className="z-20" title="Info" />
                                                </button>
                                            </Link>
                                            <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                                            onClick={() => deleteBookingTempat(dataPeminjamanTempat.id)}
                                            >
                                                <FaTrashAlt className="z-30" title="Delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                
            {/* fitur pagination */}
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 mr-2 rounded-md bg-blue-500 text-white ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaAngleLeft className="inline-block" />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(data_booking_tempat.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(data_booking_tempat.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaAngleRight className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(data_booking_tempat.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DataBookingTempat