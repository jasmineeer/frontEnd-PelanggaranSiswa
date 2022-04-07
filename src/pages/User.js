import { useState, useEffect } from "react";
import axios from "axios";

export default function User() {
    let [user, setUser] = useState([])

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
         * endpoint = http://localhost:8080/user 
         * method = GET
         * request = -
         * response = array data user
         * authorization = Bearer Token
         */

        let endpoint = `http://localhost:8080/user`

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state pelanggaran */
            setUser(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className="container-fluid">
            <div className="card m-2">
                <div className="card-header" style={{background: `pink`}}>
                    <h4 className="display-6 text-white">
                        Data User 
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {user.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-3">
                                        <small className="text-info">
                                            ID User
                                        </small>
                                    
                                        <h5>
                                            {item.id_user}
                                        </h5>
                                    </div>

                                    <div className="col-6">
                                        <small className="text-warning">
                                            Nama User
                                        </small>

                                        <h5>
                                            {item.nama_user}
                                        </h5>
                                    </div>

                                    <div className="col-3">
                                        <small className="text-danger">
                                            Username
                                        </small>

                                        <h5>
                                            {item.username}
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