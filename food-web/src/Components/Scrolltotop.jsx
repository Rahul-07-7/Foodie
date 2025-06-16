// Scrolltotop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, search } = useLocation(); // include search to catch query changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]); // trigger scroll on path or query change

  return null;
}

export default ScrollToTop;
