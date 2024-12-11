import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
  const [dataUser, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const tampilData = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    tampilData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin Hapus Data ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://127.0.0.1:3000/api/users/' + id, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.json())
          .then(() => tampilData());
      }
    });
  };

  return (
    <div className="content" style={{ width: '100%' }}>
      <div className="card-body">
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ margin: '0', fontWeight: '500' }}>Users</h1>
          <Link to="/admin/addusers"
            className="btn btn-primary d-flex align-items-center"
            style={{ height: '40px', borderRadius: '8px' }}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Tambah Data
          </Link>
        </div>

        <div style={{margin:"20px -10px", width: '100%' }} className='card'>
          <table className="table table-bordered table-hover text-center">
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th style={{ width: '50px' }}>No</th>
                <th className="d-none d-md-table-cell">Nama</th>
                <th>Email</th>
                <th style={{ width: '250px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.length > 0 ? (
                dataUser.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="d-none d-md-table-cell">{item.nama}</td>
                    <td>{item.email}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link
                        to={`/admin/edituser/${item.id}`}
                        className="btn btn-success d-flex align-items-center"
                        style={{ marginRight: '8px', borderRadius: '8px' }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '13px' }} />
                        <span className="d-none d-md-inline" style={{ marginLeft: '5px' }}>Edit</span>
                      </Link>
                      <button
                        className="btn btn-danger d-flex align-items-center"
                        onClick={() => handleDelete(item.id)}
                        style={{ borderRadius: '8px' }}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '13px' }} />
                        <span className="d-none d-md-inline" style={{ marginLeft: '5px' }}>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Data Kosong</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
