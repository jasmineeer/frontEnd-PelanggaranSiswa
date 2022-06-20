import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

export default function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/listPelanggaranSiswa">Pelanggaran Siswa</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/siswa">Siswa</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/user">User</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/pelanggaran">Pelanggaran</a>
                        </li>

                        <Dropdown>
                            <DropdownToggle className="bg-light text-dark" style={{border: `white`}}>Pelanggaran Siswa</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/pelanggaranSiswa">Form Pelanggaran Siswa</DropdownItem>
                                <DropdownItem href="/listPelanggaranSiswa">List Pelanggaran Siswa</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    )
}