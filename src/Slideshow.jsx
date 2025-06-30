import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 

function Slideshow() {
  return (
    <div style={{ width: '75%', marginTop: '20px', marginBottom: '20px', margin: 'auto', backgroundSize: 'cover'}}>
      <Splide 
        options={{
          type     : 'loop',
          perPage   : 1,
          autoplay  : true,
          interval  : 6000,
          pagination: true,
          arrows   : true,
        }}
      >
        <SplideSlide><img style={{width: '75%', height: '85%', display: 'flex', margin: 'auto', borderRadius: '20px'}} src="./src/assets/carousel_photo_1.jpg" alt="1" /></SplideSlide>
        <SplideSlide><img style={{borderRadius: '20px'}} src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="2" /></SplideSlide>
        <SplideSlide><img style={{borderRadius: '20px'}} src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="3" /></SplideSlide>
      </Splide>
    </div>
  );
}

export default Slideshow;
