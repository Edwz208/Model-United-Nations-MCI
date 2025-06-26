// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation'; 
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 

function Slideshow() {
  return (
    <div style={{ width: '75%', borderRadius: '10px', margin: 'auto', backgroundSize: 'cover'}}>
      <Splide
        options={{
          type     : 'fade',
          perPage   : 1,
          autoplay  : true,
          interval  : 6000,
          pagination: true,
          arrows   : true,
        }}
      >
        <SplideSlide><img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="1" /></SplideSlide>
        <SplideSlide><img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="2" /></SplideSlide>
        <SplideSlide><img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/11/cropped-pxl_20240220_175528049.jpg" alt="3" /></SplideSlide>
      </Splide>
    </div>
  );
}

export default Slideshow;
