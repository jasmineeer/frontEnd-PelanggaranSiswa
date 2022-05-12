import { useState, useEffect } from "react"
import axios from "axios"

export default function PelanggaranSiswa() {
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])
    let [selectedSiswa, setSelectedSiswa] = useState("")
    let [selectedDate, setSelectedDate] = useState("")
    let [selectedPelanggaran, setSelectedPelanggaran] = useState([])

    /** Get token from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getSiswa = () => {
        let endpoint = `http://localhost:8080/siswa`
        axios.get(endpoint, authorization)
        .then(response => {
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }

    let getPelanggaran = () => {
        let endpoint = `http://localhost:8080/pelanggaran`
        axios.get(endpoint, authorization)
        .then(response => {
            setPelanggaran(response.data)
        })
        .catch(error => console.log(error))
    }

    let addPelanggaran = (id_pelanggaran) => {
        // cek keberadaan id pelanggaran dalam selectedPelanggaran
        let temp = [...selectedPelanggaran]
        let found = temp.find(item => item.id_pelanggaran === id_pelanggaran)

        // jika ditemukan data yang sama, maka dihapus
        // jika tidak menemukan, maka ditambahkan
        if (found) {
            let index = temp.findIndex(item => item.id_pelanggaran === id_pelanggaran)
            temp.splice(index, 1)
        }else {
            temp.push({
                id_pelanggaran: id_pelanggaran
            })
        }

        setSelectedPelanggaran(temp)
    }

    let simpanPelanggaranSiswa = () => {
        if(window.confirm(`Are you sure?`)){
            // ambil id user dari local storage
        let user = JSON.parse(localStorage.getItem(`user-pelanggaran`))
        let id = user.id_user 

        let endpoint = `http://localhost:8080/pelanggaran_siswa`
        let request = {
            waktu: selectedDate,
            id_user: id,
            id_siswa: selectedSiswa,
            detail_pelanggaran_siswa: selectedPelanggaran
        }
        axios.post(endpoint, request, authorization)
        .then(response => {
            alert(response.data.message)
        })
        .catch(error => console.log(error))
        }

    }

    useEffect(() => {
        getSiswa()
        getPelanggaran()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                style={{background:`lightblue`}}>
                    <h4 className="display-6 text-white">Form Pelanggaran Siswa</h4>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            Pilih Siswa 
                        </div>

                        <div className="col-10 my-2">
                            <select className="form-control" value={selectedSiswa} 
                            onChange={ev => setSelectedSiswa(ev.target.value)}>
                                <option value="">
                                    -- LIST SISWA --
                                </option>
                                {siswa.map(item => (
                                    <option value={item.id_siswa}
                                    key={`key${item.id_siswa}`}>
                                        { item.nama }
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-2 my-2">
                            Pilih Pelanggaran 
                        </div>

                        <div className="col-10 my-2">
                                {pelanggaran.map(item => (
                                    <div key={`ppp${item.id_pelanggaran}`}>
                                        <input type="checkbox"
                                        value={item.id_pelanggaran} 
                                        className="me-2"
                                        onClick={() => addPelanggaran(item.id_pelanggaran)} />  
                                        { item.nama_pelanggaran }
                                    </div>                                  
                                ))}
                        </div>


                        <div className="col-2 my-2">
                            Tanggal Pelanggaran 
                        </div>

                        <div className="col-10 my-2">
                            <input type="date" className="form-control"
                            onChange={ev => setSelectedDate(ev.target.value)}
                            value={selectedDate} />
                        </div>

                    </div>

                    <button className="btn btn-info" onClick={() => simpanPelanggaranSiswa()}>
                        <span className="fa fa-check mx-1"></span> Simpan 
                    </button>

                    {/* isi dari selected siswa: {selectedSiswa} <br />
                    isi dari selected date : {selectedDate} <br />
                    isi dari selected pelanggaran : {selectedPelanggaran.map(item => `${item.id_pelanggaran},`)}  */}

                </div>
            </div>
        </div>
    )
}