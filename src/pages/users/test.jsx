import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BukuTamu = () => {
  const [dataTamu, setTamu] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);  // Default 10 records per page
  const token = localStorage.getItem("token");

  // Fetch guest data
  const tampilData = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/bukutamu", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setTamu(data);
  };

  useEffect(() => {
    tampilData();
  }, []);

  // Handle delete operation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin Mau Hapus ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://127.0.0.1:3000/api/bukutamu/' + id, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.json())
          .then(() => {
            tampilData();
          });
      }
    });
  };

   // Search function
   const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredData = dataTamu.filter(
    (item) =>
      item.nama_tamu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.no_hp.includes(searchQuery) ||
      item.asal_instansi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tujuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.yang_dituju.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
  );
   // Handle per-page entries change
   const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when per-page selection changes
  };
   // Pagination logic
   const indexOfLastRecord = currentPage * perPage;
   const indexOfFirstRecord = indexOfLastRecord - perPage;
   const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
 
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to download table data as CSV
  const downloadCSV = () => {
    const header = [
      "No", "Nama Tamu", "No Hp", "Asal Instansi", "Tujuan", "Yang Dituju", "Tanggal Kunjungan", "Keterangan"
    ];

    const rows = dataTamu.map((item, index) => [
      index + 1,
      item.nama_tamu,
      item.no_hp,
      item.asal_instansi,
      item.tujuan,
      item.yang_dituju,
      new Date(item.tanggal_kunjungan).toLocaleDateString('id-ID', {
        year: 'numeric', month: '2-digit', day: '2-digit',
      }),
      item.keterangan
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "buku_tamu.csv");
    link.click();
  };

  return (
    <div className="content">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0" style={{ fontSize: '35px' }}>Buku Tamu</h1>
            </div>
            <div className="col-sm-6" style={{ marginTop: '10px' }}>
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Buku Tamu</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

        <div className="d-flex">
      {/* Download Button */}
      <div className="container-fluid">
        <button 
          onClick={downloadCSV} 
          className="btn btn-primary" 
          style={{ marginBottom: '20px', marginLeft: '20px' }}
        >
          Download CSV
        </button>
      </div>
      
      <input
            type="text"
            placeholder="Seaarch..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '30%',
              height:'45px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '15px',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            }}
          />
</div>
      <div className="card" style={{ width: '96%', marginLeft: '20px', marginRight: '20px' }}>
        <table className="table table-bordered table-hover" style={{ width: '100%', textAlign: 'center', marginTop: '0px', marginBottom: '-3PX' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr style={{ height: '0px' }}>
              <th style={{ alignContent: 'center', width: '50px', fontSize: '14px' }}>No</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Nama Tamu</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>No Hp</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Asal Instansi</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Tujuan</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Yang Dituju</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Tanggal Kunjungan</th>
              <th style={{ alignContent: 'center', fontSize: '14px' }}>Keterangan</th>
              <th style={{ width: '200px', alignContent: 'center', fontSize: '14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
  {currentRecords.length > 0 ? (
    currentRecords.map((item, index) => (
      <tr key={item.id}>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{index + 1}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.nama_tamu}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.no_hp}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.asal_instansi}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.tujuan}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.yang_dituju}</td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>
          {new Date(item.tanggal_kunjungan).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </td>
        <td style={{ alignContent: 'center', fontSize: '14px' }}>{item.keterangan}</td>
        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link
            to={`/admin/edittamu/${item.id}`}
            className="btn btn-success"
            style={{ marginRight: '8px', borderRadius: '8px', background: '#4CAF50', padding: '6px 12px', fontSize: '15px' }}
          >
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px', fontSize: '13px' }} />
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item.id)}
            style={{ borderRadius: '8px', background: '#f44336', padding: '6px 12px', fontSize: '15px' }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px', fontSize: '13px' }} />
            Hapus
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={9}>Data Kosong</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      <div style={{ textAlign: 'center' }}>
  {filteredData.length > perPage && (
    <ul className="pagination" style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
      {[...Array(Math.ceil(filteredData.length / perPage))].map((_, index) => (
        <li
          key={index}
          className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
          onClick={() => paginate(index + 1)}
          style={{
            display: 'inline',
            cursor: 'pointer',
            marginRight: '8px',
          }}
        >
          <span className="page-link" style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ddd' }}>
            {index + 1}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default BukuTamu;
