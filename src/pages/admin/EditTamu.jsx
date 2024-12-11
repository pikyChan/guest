import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditTamu = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [nama_tamu, setNamatamu] = useState('');
    const [no_hp, setNohp] = useState('');
    const [asal_instansi, setAsalinstansi] = useState('');
    const [tujuan, setTujuan] = useState('');
    const [yang_dituju, setYangdituju] = useState('');
    const [tanggal_kunjungan, setTanggalkunjungan] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const token = localStorage.getItem('token');
    useEffect(()=> {
        getTamu();
    },[]);
    const handleChange = (event) => {
        const name = event.target.name;
        name === 'nama_tamu'?setNamatamu(event.target.value):'';
        name === 'no_hp'?setNohp(event.target.value):'';
        name === 'asal_instansi'?setAsalinstansi(event.target.value):'';
        name === 'tujuan'?setTujuan(event.target.value):'';
        name === 'yang_dituju'?setYangdituju(event.target.value):'';
        name === 'tanggal_kunjungan'?setTanggalkunjungan(event.target.value):'';
        name === 'keterangan'?setKeterangan(event.target.value):'';
    }
    const getTamu = async () => {
        const response = await fetch("http://127.0.0.1:3000/api/bukutamu/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNamatamu(data.nama_tamu);
        setNohp(data.no_hp);
        setAsalinstansi(data.asal_instansi);
        setTujuan(data.tujuan);
        setYangdituju(data.yang_dituju);
        setTanggalkunjungan(data.tanggal_kunjungan);
        setKeterangan(data.keterangan);
    }
    const handleUpdate =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/bukutamu/" + id, {
            method: "PUT",
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
                    text: "Update Berhasil",
                    timer: 1000,
                }).then((res) => {
                    navigate( '/admin/bukutamu');
                });
            
            
        };
    }
  return (
    <div>
    <div className="container" style={{position:'relative', justifyContent:'center', display:'flex'}}>
        <div className="row">
            <div className="col-md-25">
                <div className="card" style={{ marginTop:'10px'}}>
                    <div className="card-header">
                        <h2 className='text-center'>Edit Data Tamu</h2>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="nama_tamu">Nama Tamu</label>
                                <input type="text" name="nama_tamu" className="form-control" value={nama_tamu} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="no_hp">No HP</label>
                                <input type="text" name='no_hp' className="form-control" value={no_hp} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="asal_instansi">Asal Instansi</label>
                                <input type="text" name='asal_instansi' className="form-control" value={asal_instansi} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tujuan">Tujuan</label>
                                <select id='tujuan' name='tujuan' className="form-control" value={tujuan} onChange={handleChange}>
                                <option >Pilih Unit Kerja Tujuan </option>
                                    <option value='Kepala Sekolah' >Kepala Sekolah</option>
                                    <option value='Waka Humas' >Wakil Kepala Hubungan Masyarakat</option>
                                    <option value='Waka Kurikulum' >Wakil Kepala Kurikulum</option>
                                    <option value='Waka Sarpras' >Wakil Kepala Sarana dan Prasarana</option>
                                    <option value='Guru' >Guru</option>
                                    <option value='Tenaga Administrasi' >Tenaga Administrasi</option>
                                    <option value='Staf Perpustakaan' >Staf Perpustakaan</option>
                                    <option value='Staf Tata Usaha' >Staf Tata Usaha</option>
                                    <option value='Kebersihan dan Keamanan' >Staf Kebersihan dan Keamanan</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="yang_dituju">Yang Dituju</label>
                                <input type="text" name='yang_dituju' className="form-control" value={yang_dituju} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tanggal_kunjungan">Tanggal Kunjungan</label>
                                <input type="date" name='tanggal_kunjungan' className="form-control" value={tanggal_kunjungan} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="keterangan">Keterangan</label>
                                <input type="text" name='keterangan' className="form-control" value={keterangan} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="card-footer" style={{display:"flex", gap:'20px', width:'100%'}}>
                        <Link to="/admin/bukutamu" style={{marginLeft:'18%'}} className="btn btn-primary float-start">Lihat Data</Link>
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

export default EditTamu
