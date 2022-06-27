import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap"

export default function User() {
    let [user, setUser] = useState([])
    let [message, setMessage] = useState("")
    let [idUser, setIdUser] = useState(0)
    let [namaUser, setNamaUser] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [modal, setModal] = useState(null)
    let [action, setAction] = useState("")

    /** Get token from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** create function to show toast messages */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** mengisi state message */
        setMessage(message)

        /** show toast messages */
        myToast.show()
    }

    /** Create function to get Data Pelanggaran from Back-End */
    let getData = () => {
        /**
         * endpoint = http://nodepelanggaransiswa:8080/user 
         * method = GET
         * request = -
         * response = array data user
         * authorization = Bearer Token
         */

        let endpoint = `http://nodepelanggaransiswa:8080/user`

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state pelanggaran */
            setUser(response.data)
        })
        .catch(error => console.log(error))
    }

    let tambahUser = () => {
        /** show modal */
        modal.show()

        /** mengosongkan input form */
        setIdUser(0)
        setNamaUser("")
        setUsername("")
        setPassword("")
        setAction(`insert`)
    }

    let editUser = item => {
        modal.show()

        setIdUser(item.id_user)
        setNamaUser(item.nama_user)
        setUsername(item.username)
        setPassword(item.password)
        setAction(`edit`)
    }

    let simpanUser = event => {
        event.preventDefault()
        modal.hide()

        if (action === `insert`){
            let endpoint = `http://nodepelanggaransiswa:8080/user`
            let request = {
                nama_user: namaUser,
                username: username,
                password: password 
            }

            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        } else if (action === "edit"){
            let endpoint = `http://nodepelanggaransiswa:8080/user/${idUser}`
            let request = {
                nama_user: namaUser,
                username: username,
                password: password 
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let hapusUser = item => {
        if(window.confirm(`Are you sure?`)) {
            let endpoint = `http://nodepelanggaransiswa:8080/user/${item.id_user}`

            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let modal = new Modal(document.getElementById(`modalUser`))
        setModal(modal)
        getData()
    },[])

    return (
        <div className="container-fluid">

            {/* start component Toast */}
            <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 11}}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header text-white" style={{background: `pink`}}>
                        <strong>Message</strong>
                    </div>

                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}

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

                                    <div className="col-4">
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

                                    <div className="col-2">
                                        <small className="text-info">
                                            Option 
                                        </small>
                                        <br />

                                        <button className="btn btn-sm btn-info mx-1" onClick={() => editUser(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>

                                        <button className="btn btn-sm btn-danger" onClick={() => hapusUser(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button tambah data */}
                    <button className="btn btn-success my-2" onClick={() => tambahUser()}>
                        <span className="fa fa-plus mx-1"></span>
                        Tambah Data
                    </button>

                    {/* modal form data user */}
                    <div className="modal" id="modalUser"> 
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header" style={{background: `indigo`}}>
                                    <h4 className="text-white">
                                        Form User 
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => simpanUser(ev)}>
                                        Nama 
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setNamaUser(e.target.value)} value={namaUser} />

                                        Username 
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setUsername(e.target.value)} value={username} />

                                        Password 
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setPassword(e.target.value)} value={password} />

                                        <button className="btn btn-success" type="submit">
                                            <span className="fa fa-check mx-1"></span>
                                            Simpan Data 
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}