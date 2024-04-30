import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/dataPelanggan/Pelanggan";
import TambahPelanggan from "./pages/dataPelanggan/TambahPelanggan";
import UpdatePelanggan from "./pages/dataPelanggan/UpdatePelanggan";
import DataRuang from "./pages/dataRuang/DataRuang";
import TambahRuang from "./pages/dataRuang/TambahRuang";
import UpdateRuang from "./pages/dataRuang/UpdateRuang";
import DataBookingTempat from "./pages/dataBookingTempat/DataBookingTempat";
import MenuTambahan from "./pages/menuTambahan/MenuTambahan";
import TambahMenuTambahan from "./pages/menuTambahan/TambahMenuTambahan";
import UpdateMenuTambahan from "./pages/menuTambahan/UpdateMenuTambahan";
import TambahDataBookingTempat from "./pages/dataBookingTempat/TambahDataBookingTempat";
import UpdateDataBookingTempat from "./pages/dataBookingTempat/UpdateDataBookingTempat";
import DetailBookingTempat from "./pages/dataBookingTempat/DetailBookingTempat";
import { isAuthenticated } from "./utils/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route untuk halaman register */}
          <Route path="/register" element={<Register />} />

          {/* Route untuk halaman login */}
          <Route path="/" element={<Login />} />

          {/* Route untuk halaman supervisor */}
          <Route path="/supervisor" 
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman master_pelanggan */}
          <Route path="/master_pelanggan" 
            element={isAuthenticated() ? <Pelanggan /> : <Navigate to="/" />} 
          />
 
          {/* Route untuk halaman tambah_pelanggan */}
          <Route path="/master_pelanggan/tambah_pelanggan" 
            element={isAuthenticated() ? <TambahPelanggan /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman ubah_pelanggan */}
          <Route path="/master_pelanggan/ubah_pelanggan/:id" 
            element={isAuthenticated() ? <UpdatePelanggan /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman data_ruangan */}
          <Route path="/data_ruangan" 
            element={isAuthenticated() ? <DataRuang /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman ubah_ruangan */}
          <Route path="/data_ruangan/tambah_ruangan" 
            element={isAuthenticated() ? <TambahRuang /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman ubah_ruangan */}
          <Route path="/data_ruangan/ubah_ruangan/:id" 
            element={isAuthenticated() ? <UpdateRuang /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman peminjaman_tempat */}
          <Route path="/peminjaman_tempat" 
            element={isAuthenticated() ? <DataBookingTempat /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman tambah_peminjaman_tempat */}
          <Route path="/peminjaman_tempat/tambah_peminjaman_tempat" 
            element={isAuthenticated() ? <TambahDataBookingTempat /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman ubah_peminjaman_tempat */}
          <Route path="/peminjaman_tempat/ubah_peminjaman_tempat/:id" 
            element={isAuthenticated() ? <UpdateDataBookingTempat /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman detail_peminjaman_tempat */}
          <Route path="/peminjaman_tempat/detail_peminjaman_tempat/:id" 
            element={isAuthenticated() ? <DetailBookingTempat /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman menu_tambahan */}
          <Route path="/menu_tambahan" 
            element={isAuthenticated() ? <MenuTambahan /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman tambah_menu_tambahan */}
          <Route path="/menu_tambahan/tambah_menu_tambahan" 
            element={isAuthenticated() ? <TambahMenuTambahan /> : <Navigate to="/" />} 
          />

          {/* Route untuk halaman ubah_menu_tambahan */}
          <Route path="/menu_tambahan/ubah_menu_tambahan/:id" 
            element={isAuthenticated() ? <UpdateMenuTambahan /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 