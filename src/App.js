import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import Siswa from "./pages/Siswa";
import Pelanggaran from "./pages/Pelanggaran";
import PelanggaranSiswa from "./pages/PelanggaranSiswa";
import ListPelanggaranSiswa from "./pages/ListPelanggaranSiswa";
import Navbar from "./pages/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/pelanggaransiswa" element={<PelanggaranSiswa />} />
        <Route path="/listpelanggaransiswa" element={<ListPelanggaranSiswa />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/user" element={<User />} />
        <Route path="/siswa" element={<Siswa />} />
      </Routes>
    </BrowserRouter>
  )
}