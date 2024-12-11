import React from "react";

const Preload = () => {
  return (
    <>
    {/* Preloader */}
 <div className="preloader flex-column justify-content-center align-items-center">
   <img className="animation__shake" src="/src/assets/logo_old.png" alt="AdminLTELogo" height={60} width={50} />
   <p style={{marginTop:'10px', fontWeight:'600'}}>SMKN 1 PONOROGO</p>
 </div>
 
     </>
  )
}
export default Preload;