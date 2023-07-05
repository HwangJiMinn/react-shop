import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useEventBannerVisibility = () => {
  const location = useLocation();
  const [showEventBanner, setShowEventBanner] = useState(location.pathname === "/");

  useEffect(() => {
    setShowEventBanner(location.pathname === "/");
  }, [location]);

  return [showEventBanner, setShowEventBanner];
};

export default useEventBannerVisibility;