import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditUsers = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=> {
        getUser();
    },[]);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'nama'?setNama(event.target.value):'';
        name === 'email'?setEmail(event.target.value):'';
    }
    const getUser = async () => {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNama(data.nama);
        setEmail(data.email);
    }

    const handleUpdate =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/users/" + id, {
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
                    navigate( '/admin/users');
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
                        <h2 className='text-center'>Edit Data User</h2>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="nama">Nama</label>
                                <input type="text" name="nama" className="form-control" value={nama} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' className="form-control" value={email} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' className="form-control" />
                                <span className='text-danger' style={{fontSize:"14px"}}>Kosongkan jika tidak ingin mengubah password</span>
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

export default EditUsers
