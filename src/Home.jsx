import Slideshow from './Slideshow.jsx' 
function Home (){
    return (
      <div>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="1" style={{width: "100%", height: "100%"}}/>
        <div className="overlay" style={{background: '#282832'}}>
        <div style={{display: "flex", flexDirection: "column", color: "white", alignItems: "center", textAlign: "center"}}>
            <div style={{ fontSize: "50px", fontWeight: "900", marginTop: "20px", marginBottom: "20px", color: 'white'}}>
            MMUN
        </div>
        <div style={{ fontSize: "18px", fontWeight: "normal", marginBottom: "20px", width: "50%", color: "white"}}>
            For over thirty years, the Martingrove Model UN (MMUN) conference has offered thousands of students — both from its home at Martingrove Collegiate Institute and across the GTA — a stimulating and exciting simulation that emulates the atmosphere of a real-world United Nations Conference. Students assume the roles of delegates for their given countries, engaging in debates on a variety of topics that reflect current, pressing global issues, and are counted on to progress these debates forward over the duration of the conference. If you have any questions regarding the nature or procedures of MMUN, please visit the FAQ page or email us at martingrovemodelun@gmail.com.      </div>
        </div>
        <div >
            <Slideshow />
        </div>
        <div >
            <h1 style={{color: "white", fontSize: "14px", fontWeight: "200", marginTop: "20px", marginBottom: "0px", textAlign: "center"}}>Made by Edwin Zeng and Nathan Perlman</h1>
        </div>
        </div>
     </div>
    )
}

export default Home
