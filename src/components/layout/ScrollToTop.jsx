import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top:0, bottom:0, behaviour:"instant"});
  }, [pathname]);
};

export default ScrollToTop;