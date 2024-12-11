import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BukuTamu = () => {
  const [dataTamu, setTamu] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default 10 records per page
  const token = localStorage.getItem('token');

  // Fetch data from the API
  const tampilData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/bukutamu', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data dari API');
      }

      const data = await response.json();
      setTamu(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tampilData();
  }, []);

  // Fungsi untuk mendapatkan tanggal hari ini dalam format MM/DD/YYYY
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const todayDate = getTodayDate();

  // Filter data untuk menampilkan hanya data hari ini
  const dataHariIni = dataTamu.filter((item) => {
    const itemDate = new Date(item.tanggal_kunjungan).toLocaleDateString('en-US'); // Format MM/DD/YYYY
    return itemDate === todayDate;
  });

  // Filter data berdasarkan query pencarian
  const filteredData = dataHariIni.filter(
    (item) =>
      item.asal_instansi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tujuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <Header />
      <br /><br /><br /><br />
      <div
  className="container"
  style={{
   // marginTop: '85px',
    maxWidth: '1200px',
    padding: '20px',
    minHeight: 'calc(100vh - 50px)', // Pastikan ini tidak berubah
    display: 'flex',
    flexDirection: 'column',
  }}
>


        
        <h2 className="text-center" style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>
          Data Tamu Hari Ini
        </h2>

        {/* Search and Entries Per Page Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Show</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span style={{ marginLeft: '10px' }}>entries</span>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '30%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Table Display */}
        <table className="table table-bordered table-hover" style={{ width: '100%', textAlign: 'center' }}>
          <thead style={{ background: '#f7f7f7', fontWeight: '600' }}>
            <tr>
              <th style={{ width: '50px', fontSize: '14px' }}>No</th>
              <th style={{ fontSize: '14px' }}>Asal Instansi</th>
              <th style={{ fontSize: '14px' }}>Tujuan</th>
              <th style={{ fontSize: '14px' }}>Tanggal Kunjungan</th>
              
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <tr key={item.id} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ fontSize: '14px' }}>{index + 1 + (currentPage - 1) * perPage}</td>
                  <td style={{ fontSize: '14px' }}>{item.asal_instansi}</td>
                  <td style={{ fontSize: '14px' }}>{item.tujuan}</td>
                  <td style={{ fontSize: '14px' }}>
                    {new Date(item.tanggal_kunjungan).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Data Kosong</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredData.length > perPage && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ul className="pagination">
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
          </div>
        )}
      </div>
      <Footer />

    </div>
  );
};

export default BukuTamu;
