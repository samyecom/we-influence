'use client';

import { useState } from 'react';
import Preloader from './Preloader';

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
        {children}
      </div>
    </>
  );
}
