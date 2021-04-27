import { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';

const useClipboard = () => {
  const [success, setSuccess] = useState(false);

  const copy = (text) => {
    try {
      copyToClipboard(text);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setSuccess(false);
    }
  };

  return { success, copy };
};

export default useClipboard;
