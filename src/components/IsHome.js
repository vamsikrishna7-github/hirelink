'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function IsHome() {
  const pathname = usePathname();
  const [ishome, setIshome] = useState(true); // assume home initially

  useEffect(() => {
    setIshome(pathname === '/' || pathname.startsWith('/dashboard') );
  }, [pathname]);

  return (
    <>
      {!ishome && (
        <>
          <br />
          <br />
        </>
      )}
    </>
  );
}
