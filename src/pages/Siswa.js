import { useState, useEffect } from "react"
import axios from "axios"

export default function Siswa() {
    let [siswa, setSiswa] = useState([])

    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        /**
         * endpoint = http://localhost:8080/siswa
         * method = GET
         * request = -
         * response = array data siswa
         * authorization = Bearer token
         */

        let endpoint = `http://localhost:8080/siswa`

        /** sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Menyimpan data di state siswa */
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header" style={{background: `purple`}}>
                    <h4 className="display-6 text-white">
                        Data Siswa 
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item" key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/* section gambar */}
                                    <div className="col-4">
                                        <img src={`http://localhost:8080/image/${item.image}`} alt="Gambar Siswa" 
                                        style={{width: `250px`, height: `250px`, borderRadius: `50%`}}/>
                                    </div>

                                    {/* section deskripsi */}
                                    <div className="col-8">
                                        <small className="text-info">NIS</small>
                                        <h6>{item.nis}</h6>

                                        <small className="text-success">Nama</small>
                                        <h6>{item.nama}</h6>

                                        <small className="text-warning">Kelas</small>
                                        <h6>{item.kelas}</h6>

                                        <small className="text-danger">Poin</small>
                                        <h6>{item.poin}</h6>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}