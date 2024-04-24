import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Login />} />

          <Route path="/supervisor" element={<Dashboard />} />

          <Route path="/master_pelanggan" element={<Pelanggan />} />
 
          <Route path="/master_pelanggan/tambah_pelanggan" element={<TambahPelanggan />} />

          <Route path="/master_pelanggan/ubah_pelanggan/:id" element={<UpdatePelanggan />} />

          <Route path="/data_ruangan" element={<DataRuang />} />

          <Route path="/data_ruangan/tambah_ruangan" element={<TambahRuang />} />

          <Route path="/data_ruangan/ubah_ruangan/:id" element={<UpdateRuang />} />

          <Route path="/peminjaman_tempat" element={<DataBookingTempat />} />

          <Route path="/peminjaman_tempat/tambah_peminjaman_tempat" element={<TambahDataBookingTempat />} />

          <Route path="/peminjaman_tempat/ubah_peminjaman_tempat/:id" element={<UpdateDataBookingTempat />} />

          <Route path="/menu_tambahan" element={<MenuTambahan />} />

          <Route path="/menu_tambahan/tambah_menu_tambahan" element={<TambahMenuTambahan />} />

          <Route path="/menu_tambahan/ubah_menu_tambahan/:id" element={<UpdateMenuTambahan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 