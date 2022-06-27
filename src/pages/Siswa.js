import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Toast } from "bootstrap"
import { upload } from "@testing-library/user-event/dist/upload"

export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [message, setMessage] = useState("")
    let [idSiswa, setIdSiswa] = useState(0)
    let [nis, setNis] = useState(0)
    let [nama, setNama] = useState("")
    let [kelas, setKelas] = useState("")
    let [poin, setPoin] = useState(0)
    let [image, setImage] = useState(null)
    let [modal, setModal] = useState(null)
    let [action, setAction] = useState("")
    let [uploadImage, setUploadImage] = useState(true)

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
        /** perintah untuk mengisi state `message` */
        setMessage(message)

        /** show toast messages */
        myToast.show()
    }

    let getData = () => {
        /**
         * endpoint = http://nodepelanggaransiswa:8080/siswa
         * method = GET
         * request = -
         * response = array data siswa
         * authorization = Bearer token
         */

        let endpoint = `http://nodepelanggaransiswa:8080/siswa`

        /** sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Menyimpan data di state siswa */
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }

    let tambahSiswa = () => {
        /** show modal */
        modal.show()

        /** mengosongkan input form */
        setIdSiswa(0)
        setNis(0)
        setNama("")
        setKelas("")
        setPoin(0)
        setImage(null)
        setUploadImage(true)
        setAction("insert")
    }

    let editSiswa = item => {
        modal.show()

        setIdSiswa(item.id_siswa)
        setNis(item.nis)
        setNama(item.nama)
        setKelas(item.kelas)
        setPoin(item.poin)
        setImage(null)
        setUploadImage(false)
        setAction("edit")
    }

    let simpanSiswa = event => {
        event.preventDefault()
        modal.hide()

        if(action === "insert") {
            let endpoint = `http://nodepelanggaransiswa:8080/siswa`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append(`nama`, nama)
            request.append(`kelas`, kelas)
            request.append(`poin`, poin)
            request.append(`image`, image)

            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))

        } else if(action === "edit") {
            let endpoint = `http://nodepelanggaransiswa:8080/siswa/${idSiswa}`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append(`nama`, nama)
            request.append(`kelas`, kelas)
            request.append(`poin`, poin)

            if(uploadImage === true) {
                request.append(`image`, image)
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let hapusSiswa = item => {
        if(window.confirm(`Are you sure want to delete this item?`)) {
            let endpoint = `http://nodepelanggaransiswa:8080/siswa/${item.id_siswa}`

            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let modal = new Modal(document.getElementById(`modalSiswa`))
        setModal(modal)
        getData()
    }, [])

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

            <div className="card">
                <div className="card-header" style={{background: `indigo`}}>
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
                                        <img src={`http://nodepelanggaransiswa:8080/image/${item.image}`} alt="Gambar Siswa" 
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

                                        <small className="text-info">Option</small>
                                        <br />
                                        <button className="btn btn-sm btn-info m-2" onClick={() => editSiswa(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>

                                        <button className="btn btn-sm btn-danger m-2" onClick={() => hapusSiswa(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button tambah data */}
                    <button className="btn btn-success my-2" onClick={() => tambahSiswa()}>
                        <span className="fa fa-plus mx-1"></span>
                        Tambah data 
                    </button>

                    {/* modal form data siswa */}
                    <div className="modal" id="modalSiswa">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header" style={{background: `indigo`}}>
                                    <h4 className="text-white">
                                        Form Siswa 
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => simpanSiswa(ev)}>
                                        NIS 
                                        <input type="number" className="form-control mb-2" 
                                        onChange={ev => setNis(ev.target.value)} value={nis} required/>

                                        Nama 
                                        <input type="text" className="form-control mb-2" 
                                        onChange={ev => setNama(ev.target.value)} value={nama} required/>

                                        Kelas 
                                        <input type="text" className="form-control mb-2" 
                                        onChange={ev => setKelas(ev.target.value)} value={kelas} required/>

                                        Poin 
                                        <input type="number" className="form-control mb-2" 
                                        onChange={ev => setPoin(ev.target.value)} value={poin} required/>

                                        Image 
                                        <input type="file" className={`form-control mb-2 ${uploadImage ? `` : `d-none`}`} accept="image/jpg" 
                                        onChange={ev => setImage(ev.target.files[0])} required= {uploadImage} />

                                        <button className={`btn btn-warning btn-sm mx-1 my-2 ${uploadImage ? `d-none` : ``}`}
                                        onClick={() => setUploadImage(true)}>
                                            Click to re-upload image 
                                        </button>

                                        <br />

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