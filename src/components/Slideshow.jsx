import './Slideshow.css'

function Slideshow() {
  return (
    <div className='carousel'>
      <div className="slider">
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_0739.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3749.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3194.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3497.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/p1090241.jpg" alt="image"/>
      </div>
      <div aria-hidden className='slider'>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_0739.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3749.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3194.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/img_3497.jpg" alt="image"/>
        <img src="https://martingrovemodelun.wordpress.com/wp-content/uploads/2024/12/p1090241.jpg" alt="image"/>
      </div>
    </div>
  );
}

export default Slideshow;
