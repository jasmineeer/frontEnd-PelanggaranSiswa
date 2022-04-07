import { useState, useEffect } from "react";
import axios from "axios";

export default function Pelanggaran() {
    let [pelanggaran, setPelanggaran] = useState([])

    /** Get token from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** Create function to get Data Pelanggaran from Back-End */
    let getData = () => {
        /**
         * endpoint = http://localhost:8080/pelanggaran 
         * method = GET
         * request = -
         * response = array data pelanggan
         * authorization = Bearer Token
         */

        let endpoint = `http://localhost:8080/pelanggaran `

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state pelanggaran */
            setPelanggaran(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className="container-fluid">
            <div className="card m-2">
                <div className="card-header" style={{background: `purple`}}>
                    <h4 className="display-6 text-white">
                        Jenis Pelanggaran 
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {pelanggaran.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-3">
                                        <small className="text-info">
                                            ID Pelanggaran
                                        </small>
                                    
                                        <h5>
                                            {item.id_pelanggaran}
                                        </h5>
                                    </div>

                                    <div className="col-6">
                                        <small className="text-warning">
                                            Pelanggaran
                                        </small>

                                        <h5>
                                            {item.nama_pelanggaran}
                                        </h5>
                                    </div>

                                    <div className="col-3">
                                        <small className="text-danger">
                                            Poin
                                        </small>

                                        <h5>
                                            {item.poin}
                                        </h5>
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