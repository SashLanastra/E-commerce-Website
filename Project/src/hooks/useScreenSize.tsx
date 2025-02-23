import { useState, useEffect } from 'react';

type Breakpoints = {
  isMobile: boolean;   // < 639px
  isTablet: boolean;   // >= 639px && < 1024px
  isDesktop: boolean;  // >= 1024px
};

export const useScreenSize = (): Breakpoints => {
  const [screenSize, setScreenSize] = useState<Breakpoints>({
    isMobile: window.innerWidth < 639,
    isTablet: window.innerWidth >= 639 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 639,
        isTablet: width >= 639 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return screenSize;
};