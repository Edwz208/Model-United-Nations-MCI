const Footer = () => {
    const scrollToTop =()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  return (
    
        <footer className="m-0 bg-primary-dark py-6">
            <div className="m-0 flex w-full justify-between items-center">
            <div className="mx-auto flex align-center text-secondary gap-x-10 text-4xl">
              <a href="mailto:martingrovemodelun@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://github.com/Edwz208/Model-United-Nations-MCI" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com/mcimun/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="flex flex-col text-all-children items-center gap-1 text-card-surface">
              <p className='text-xl'>
                Made by: MMUN Web Team
              </p>
              <p className='text-sm'>© 2026 Martingrove Model UN</p>
            </div>
            <div className='flex items-center cursor-pointer mx-auto' onClick={scrollToTop}>
                <img className="w-24 h-24 " src="/un_logo.svg" alt="UN logo"/>
                <p className="text-card-surface text-4xl hover:underline">MMUN</p>
            </div>
            </div>
        </footer>
        
          )
}

export default Footer