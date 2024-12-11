import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddUsers = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleSubmit =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/users", {
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
                    navigate( '/admin/users');
                });
            
            
        };
    }
  return (
    <div>
    <div className="container" style={{marginLeft:'25%',}}>
        <div className="row">
            <div className="col-md-5">
                <div className="card" style={{ marginTop:'20px', marginBottom:'20px'}}>
                    <div className="card-header">
                        <h2 className='text-center'>Input Data User</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="nama">Nama</label>
                                <input type="text" name="nama" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' className="form-control" />
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

export default AddUsers
