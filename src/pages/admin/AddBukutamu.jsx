import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddBukutamu = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleSubmit =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/bukutamu", {
            method: "POST",
            mode :"cors",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`,
            },
            body: JSON.stringify(fData),
    });
            if (!response.ok) {
                console.log(error => console.error);
            }else {
                event.target.reset();
                Swal.fire({
                    icon: "success",
                    text: "Simpan Berhasil",
                    timer: 1000,
                }).then((res) => {
                    navigate( '/admin/bukutamu');
                });
        };
    }
  return (
    <div>
    <div className="container" style={{marginLeft:'25%',}}>
        <div className="row">
            <div className="col-md-5">
                <div className="card" style={{ marginTop:'10px'}}>
                    <div className="card-header">
                        <h2 className='text-center'>Input Data Tamu</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="nama_tamu">Nama Tamu</label>
                                <input type="text" name="nama_tamu" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="no_hp">No HP</label>
                                <input type="text" name='no_hp' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="asal_instansi">Asal Instansi</label>
                                <input type="text" name='asal_instansi' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tujuan">Tujuan</label>
                                <select id='tujuan' name='tujuan' className="form-control" >
                                    <option >Pilih Unit Kerja Tujuan </option>
                                    <option value='Kepala Sekolah' >Kepala Sekolah</option>
                                    <option value='Waka Kesiswaan' >Waka Kesiswaan</option>
                                    <option value='Waka Kurikulum' >Waka Kerikulum</option>
                                    <option value='Waka Sarpras' >Waka Sarana dan Prasarana</option>
                                    <option value='Guru' >Guru</option>
                                    <option value='Tenaga Administrasi' >Tenaga Administrasi</option>
                                    <option value='Staf Perpustakaan' >Staf Perpustakaan</option>
                                    <option value='Staf Tata Usaha' >Staf Tata Usaha</option>
                                    <option value='Kebersihan dan Keamanan' >Staf Kebersihan dan Keamanan</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="yang_dituju">Yang Dituju</label>
                                <input type="text" name='yang_dituju' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tanggal_kunjungan">Tanggal Kunjungan</label>
                                <input type="date" name='tanggal_kunjungan' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="keterangan">Keterangan</label>
                                <input type="text" name='keterangan' className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer" style={{display:"flex", gap:'20px', width:'100%'}}>
                        <Link to="/admin/users" style={{marginLeft:'18%'}} className="btn btn-primary float-start">Lihat Data</Link>
                            <button type="submit" className='btn btn-primary'>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddBukutamu
