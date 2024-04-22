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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;