import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const BukuTamu = () => {
  const [dataTamu, setTamu] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const token = localStorage.getItem("token");

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin Mau Hapus ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:3000/api/bukutamu/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.json())
          .then(() => {
            tampilData();
          });
      }
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
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

  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const maxVisiblePages = 5; // Number of pages to show in the pagination bar

  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const downloadExcel = () => {
    const header = [
      ["No", "Nama Tamu", "No Hp", "Asal Instansi", "Tujuan", "Yang Dituju", "Tanggal Kunjungan", "Keterangan"]
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

    const worksheet = XLSX.utils.aoa_to_sheet(header.concat(rows));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buku Tamu");

    XLSX.writeFile(workbook, "buku_tamu.xlsx");
  };

  return (
    <div className="content" style={{ width: "100%" }}>
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Buku Tamu</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Buku Tamu</li>
          </ol>
        </div>
      </div>

      {/* Search and Download Row */}
      <div className="card" style={{margin:"20px -10px"}}>
        <div className="row mb-3" style={{ alignItems: "center" }}>
        <div className="col-md-6 ">
            <button onClick={downloadCSV} className="btn btn-primary mr-2">
              Download CSV
            </button>
            <button onClick={downloadExcel} className="btn btn-success">
              Download Excel
            </button>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                width: '100%',
                height: '45px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '15px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          </div>
         
        </div>

        {/* Table */}
        <table
          className="table table-bordered table-hover"
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "-3px",
          }}
        >
          {/* Table Headers */}
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th style={{alignContent:'center'}}>No</th>
              <th className="d-none d-md-table-cell">Nama Tamu</th>
              <th style={{alignContent:'center'}} className="d-none d-md-table-cell">No Hp</th>
              <th className="d-none d-md-table-cell">Asal Instansi</th>
              <th style={{alignContent:'center'}} className="d-none d-md-table-cell">Tujuan</th>
              <th>Yang Dituju</th>
              <th className="d-none d-md-table-cell">Tanggal Kunjungan</th>
              <th style={{alignContent:'center'}} className="d-none d-md-table-cell">Keterangan</th>
              <th style={{alignContent:'center'}}>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
          {currentRecords.length > 0 ? (
    currentRecords.map((item, index) => (
      <tr key={item.id}>
        <td>{indexOfFirstRecord + index + 1}</td>
        <td className="d-none d-md-table-cell">{item.nama_tamu}</td>
        <td className="d-none d-md-table-cell">{item.no_hp}</td>
        <td className="d-none d-md-table-cell">{item.asal_instansi}</td>
        <td className="d-none d-md-table-cell">{item.tujuan}</td>
        <td >{item.yang_dituju}</td>
        <td className="d-none d-md-table-cell">
          {new Date(item.tanggal_kunjungan).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </td>
        <td className="d-none d-md-table-cell">{item.keterangan}</td>
        <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link
            to={`/admin/edittamu/${item.id}`}
            className="btn btn-success"
            style={{
              marginRight: "8px",
              borderRadius: "8px",
              background: "#4CAF50",
              padding: "6px 12px",
              fontSize: "15px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faEdit} style={{ fontSize: "13px" }} />
            <span className="d-none d-md-inline">Edit</span>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item.id)}
            style={{
              borderRadius: "8px",
              background: "#f44336",
              padding: "6px 12px",
              fontSize: "15px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: "13px" }} />
            <span className="d-none d-md-inline">Hapus</span>
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

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
            {filteredData.length > perPage && (
              <ul className="pagination" style={{ display: "flex", justifyContent: "center" }}>
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                >
                  <span className="page-link">Previous</span>
                </li>
                {getVisiblePages().map((page) => (
                  <li
                    key={page}
                    className={`page-item ${page === currentPage ? "active" : ""}`}
                    onClick={() => paginate(page)}
                  >
                    <span className="page-link">{page}</span>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                >
                  <span className="page-link">Next</span>
                </li>
              </ul>
            )}
          </div>
    </div>
  </div>
</div>

  );
};

export default BukuTamu;
