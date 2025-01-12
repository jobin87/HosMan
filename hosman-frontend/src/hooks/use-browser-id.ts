import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

const useUniqueBrowserId = () => {
  const [uniqueId, setUniqueId] = useState<string>('');

  useEffect(() => {
    const fetchFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setUniqueId(result?.visitorId);
    };

    fetchFingerprint().catch((error) => {
      console.error('Error fetching fingerprint:', error);
    });
  }, []);

  return uniqueId;
};

export default useUniqueBrowserId;
