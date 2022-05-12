import { useState, useEffect } from "react";
import axios from "axios";

export default function ListPelanggaranSiswa() {
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
        let endpoint = `http://localhost:8080/pelanggaran_siswa `

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state pelanggaran */
            setList(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header" style={{background: `navy`}}>
                    <h4 className="display-6 text-white">
                        List Pelanggaran Siswa
                    </h4>
                </div>

                <div className="card-body">

                </div>
            </div>
        </div>
    )
}