import React from "react";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import banner3 from "/src/assets/Screenshot 2024-11-24 085158.png";
import banner2 from "/src/assets/Screenshot 2024-11-24 201205.png";
import banner1 from "/src/assets/GUEST BOOK (4).png";
//import banner4 from "/src/assets/banner3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import ExamplePieChart from "../admin/ExamplePieChart";
import TanggalKunjungChart from "../admin/TanggalKunjungChart";
import WelcomeSection from "./Sambutan";
import Footer from "./Footer";

const Home = () => {
  const galeri = [
    "/src/assets/hari_santri_1-1040x600.jpg",
    "/src/assets/zebra_7-1200x600.jpg",
    "/src/assets/WhatsApp-Image-2023-10-01-at-14.42.28.jpeg",
    "/src/assets/WhatsApp-Image-2023-11-02-at-20.52.45-2.jpeg",
    "/src/assets/IMG_20241022_071901-1.jpg",
    "/src/assets/begawan_4-1536x1152.jpg",
    "/src/assets/WhatsApp-Image-2023-10-01-at-14.42.30-1_result.webp",
    "/src/assets/20230729_081203-2048x1152.jpg",
  ];

  const images = [
    "/src/assets/vokasi.png",
    "/src/assets/logo-smkpk-versi-direktorat-768x334.png",
    "/src/assets/OIP.jpeg",
    "/src/assets/download (37).jpeg",
  ];

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let el of frmel.elements) {
      fData[el.name] = el.value;
    }
    const response = await fetch("http://127.0.0.1:3000/api/bukutamu", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log((error) => console.error);
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Data Berhasil Terkirim",
        timer: 1000,
      }).then((res) => {
        navigate("/datatamu");
      });
    }
  };

  return (
    <div style={{ zIndex: "1" }}>
  <Header></Header>
  <div className="homeBannerSection" style={{ overflow: "hidden" }}>
    <Slider {...settings}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "90vh",
          }}
        >
          <img
            src={banner1}
            alt="Banner 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "90vh",
          }}
        >
          <img
            src={banner2}
            alt="Banner 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
     
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "90vh",
          }}
        >
          <img
            src={banner3}
            alt="Banner 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
       {/*
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "80vh",
          }}
        >
          <img
            src={banner4}
            alt="Banner 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
       */}
    </Slider>
    <br />
  </div>



  

    
      <div>
        {/* Title Section */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            className="display-5 fw-bold mb-3 text-center text-md-start"
            style={{ marginBottom: "15px", margin: "0 50px" }}
          >
            Selamat Datang di Buku Tamu Online Sekolah
          </h1>
          <p
            className="text-muted text-center text-md-start"
            style={{ marginTop: "-10px", margin: "0 50px" }}
          >
            Terima kasih atas kunjungan Anda ke sekolah kami. Kehadiran dan
            partisipasi Anda sangat berarti bagi kami. Silakan isi buku tamu ini
            untuk membantu kami meningkatkan pelayanan dan menjalin komunikasi
            yang lebih baik. Semoga kunjungan Anda memberikan pengalaman yang
            berkesan.
          </p>
        </div>
      </div>

      <div className="d-none d-md-block" style={{ margin: "0 50px" }}>
        <WelcomeSection />
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-30">
            <div>
              <div className="row g-0">
                {/* Right Column - Image */}
                <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center">
                  {/* Text above the image with no extra margin */}
                  <h2
                    className="text-center "
                    style={{ marginBottom: "-50px", display: "flex" }}
                  >
                    Masukkan Data{" "}
                    <h2 style={{ color: "#FFB347", fontWeight: "600" }}>
                      {" "}
                      Tamu
                    </h2>
                  </h2>

                  {/* Image */}
                  <img
                    src="/src/assets/Remove-bg.ai_1727570770053.png"
                    alt="Guest Book Illustration"
                    className="img-fluid rounded-end"
                    style={{ width: "100%", height: "70%", objectFit: "cover" }}
                  />
                </div>
                {/* Left Column - Form */}
                <div className="col-md-6 p-5">
                  <h2
                    className="text-center d-block d-md-none"
                    style={{ marginBottom: "30px", display: "flex" }}
                  >
                    Masukkan Data{" "}
                    <span style={{ color: "#FFB347", fontWeight: "600" }}>
                      Tamu
                    </span>
                  </h2>
                  {/*} <h2 className="text-center text-primary mb-4">Input Data Tamu</h2>*/}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="nama_tamu"
                        className="form-label text-muted"
                      >
                        Nama Tamu
                      </label>
                      <input
                        type="text"
                        name="nama_tamu"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="no_hp" className="form-label text-muted">
                        No HP
                      </label>
                      <input
                        type="text"
                        name="no_hp"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="asal_instansi"
                        className="form-label text-muted"
                      >
                        Asal Instansi
                      </label>
                      <input
                        type="text"
                        name="asal_instansi"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tujuan" className="form-label text-muted">
                        Tujuan
                      </label>
                      <select
                        id="tujuan"
                        name="tujuan"
                        className="form-control rounded-3 shadow-sm"
                      >
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
                    <div className="mb-4">
                      <label
                        htmlFor="yang_dituju"
                        className="form-label text-muted"
                      >
                        Yang Dituju
                      </label>
                      <input
                        type="text"
                        name="yang_dituju"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="tanggal_kunjungan"
                        className="form-label text-muted"
                      >
                        Tanggal Kunjungan
                      </label>
                      <input
                        type="date"
                        name="tanggal_kunjungan"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="keterangan"
                        className="form-label text-muted"
                      >
                        Keterangan
                      </label>
                      <input
                        type="text"
                        name="keterangan"
                        className="form-control rounded-3 shadow-sm"
                      />
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                      <Link
                        to="/datatamu"
                        className="btn btn-outline-primary rounded-pill px-4"
                      >
                        Lihat Data
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container chart my-5">
      <div className="row d-flex justify-content-center">
       
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="p-3 shadow-sm rounded area">
          <h4 style={{display:'flex', justifyContent:'center'}}>Data Kunjungan</h4>
          <br></br>
            <ExamplePieChart />
          </div>
        </div>

        
        <div className="col-12 col-md-6">
      <div
        className="p-3 shadow-sm rounded donut">
        <h4 style={{ display: "flex", justifyContent: "center", color: "black", marginBottom: "15px" }}>
          Waktu Kunjung
        </h4>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            color:'black',
            borderColor:'#000',
            stroke:'#000'
          }}
        >
          <TanggalKunjungChart />
        </div>
      </div>
    </div>
      </div>
    </div> */}

      <div>
        {/* Gallery Title Section */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#333" }}>
            Galeri Kami
          </h2>
          <p style={{ fontSize: "1rem", color: "#666", marginTop: "10px" }}>
            Jelajahi koleksi foto kami yang menunjukkan program unggulan dan
            kegiatan di sekolah.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="container my-5" >
          <div className="row" >
            {galeri.map((src, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px",
                    margin:'0px 10px',
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
