import React from 'react';
import principalPhoto from '/src/assets/1665981612-SURYANTO-1.png'; // Replace with actual path to the principal's photo

const WelcomeSection = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#ffffff',
      margin: '2rem auto',
      maxWidth: '1180px',
    }}>
      {/* Title aligned above both the welcome message and photo */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2rem',
        width: '100%',
      }}>
        {/* Left side: welcome message */}
        <div style={{
          flex: 1,
          padding: '1rem',
          textAlign: 'justify',
          fontSize: '1rem',
          lineHeight: '1.75',
          marginRight:'8rem',
          color: '#34495e',
        }}>
          <h6 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#2c3e50'}}>
            Sambutan Kepala Sekolah
          </h6>
          <p style={{ marginBottom: '1rem' }}>
            Selamat datang di website tamu sekolah kami. Kami sangat senang menyambut Anda 
            untuk menjadi bagian dari komunitas kami. Sekolah kami berdedikasi untuk memberikan 
            pendidikan berkualitas dan membentuk karakter siswa yang unggul, berintegritas, dan 
            siap menghadapi tantangan masa depan.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Semoga website ini dapat menjadi media yang bermanfaat. Terima kasih telah meluangkan waktu untuk berkunjung, dan kami berharap hubungan yang terjalin dapat membawa manfaat bagi kita semua.
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '1.5rem', color: '#2c3e50' }}>
          ~ SURYANTO, M.Pd.
          </p>
        </div>

        {/* Right side: principal's photo */}
        <div style={{
          flex: '0 0 300px',
          maxWidth: '300px',
          textAlign: 'center',
          marginRight:'100px',
        }} className="d-none d-md-block"> {/* Hide on mobile */}
          <img 
            src={principalPhoto} 
            alt="Foto Kepala Sekolah" 
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
