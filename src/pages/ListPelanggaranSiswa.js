import { useState, useEffect } from "react";
import axios from "axios";
import PelanggaranSiswa from "./PelanggaranSiswa";

export default function ListPelanggaranSiswa() {
    if (!localStorage.getItem(`token-pelanggaran`)) {
        window.location.href = "/signin"
    }
    let [list, setList] = useState([])

    /** Get token from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** Create function to get Data Pelanggaran from Back-End */
    let getData = () => {
        let endpoint = `http://nodepelanggaransiswa:8080/pelanggaran_siswa `

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state pelanggaran */
            setList(response.data)
        })
        .catch(error => console.log(error))
    }

    let hapusData = item => {
        if(window.confirm(`Are you sure want to delete this item?`)) {
            let endpoint = `http://nodepelanggaransiswa:8080/pelanggaran_siswa/${item.id_pelanggaran_siswa}`

            axios.delete(endpoint, authorization)
            .then(response => {
                alert(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }


    useEffect(() => {
        getData()
    },[])

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{background: `navy`}}>
                    <h4 className="display-6 text-white">
                        List Pelanggaran Siswa
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {list.map(item => (
                            <li className="list-group-item" key={`idPS${item.id_pelanggaran_siswa}`}>
                                <div className="row">
                                    <div className="col-4">
                                        <small className="text-info">
                                            Nama Siswa 
                                        </small>

                                        <h5>
                                            {item.siswa.nama} ({item.siswa.kelas})
                                        </h5>
                                    </div>

                                    <div className="col-2">
                                        <small className="text-danger">
                                            Poin Siswa
                                        </small>

                                        <h5>
                                            {item.siswa.poin} 
                                        </h5>
                                    </div>

                                    <div className="col-4">
                                        <small className="text-success">
                                            Waktu Pelanggaran
                                        </small>

                                        <h5>
                                            {item.waktu}
                                        </h5>
                                    </div>

                                    <div className="col-2">
                                        <small>Delete</small>
                                        <br />
                                        <button className="btn btn-sm btn-danger m-2" onClick={() => hapusData(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>   
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-warning">
                                        Detail Pelanggaran
                                    </h4>
                                    {item.detail_pelanggaran_siswa.map(detail => (
                                        <h6 key={`idDetail${detail.id_pelanggaran}`}>
                                            * {detail.pelanggaran.nama_pelanggaran}
                                        </h6>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}