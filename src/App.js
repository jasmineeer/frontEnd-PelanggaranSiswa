import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import Siswa from "./pages/Siswa";
import Pelanggaran from "./pages/Pelanggaran";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/user" element={<User />} />
        <Route path="/siswa" element={<Siswa />} />
      </Routes>
    </BrowserRouter>
  )
}