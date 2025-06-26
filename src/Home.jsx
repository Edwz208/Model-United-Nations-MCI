import Slideshow from './Slideshow.jsx' 

function Home (){
    return (
      <div>
        <div >
          <Slideshow />
        </div>
      <div className="overlay" style={{background: '#313244'}}>
      <div style={{display: "flex", flexDirection: "column", color: "white", alignItems: "center", textAlign: "center", fontFamily: "jetbrains mono"}}>
        <div style={{ fontSize: "50px", fontWeight: "900", marginTop: "20px", marginBottom: "20px", color: '#cdd6f4'}}>
          MMUN
      </div>
      <div style={{ fontSize: "18px", fontWeight: "normal", marginBottom: "20px", width: "50%", color: "#bac2de"}}>
        For over thirty years, the Martingrove Model UN (MMUN) conference has offered thousands of students — both from its home at Martingrove Collegiate Institute and across the GTA — a stimulating and exciting simulation that emulates the atmosphere of a real-world United Nations Conference. Students assume the roles of delegates for their given countries, engaging in debates on a variety of topics that reflect current, pressing global issues, and are counted on to progress these debates forward over the duration of the conference. If you have any questions regarding the nature or procedures of MMUN, please visit the FAQ page or email us at martingrovemodelun@gmail.com.      </div>
      </div>
       </div>
     </div>
    )
}

export default Home
