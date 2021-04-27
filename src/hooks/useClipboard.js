import { useState } from 'react';

const useClipboard = (target) => {
  const [success, setSuccess] = useState(false);
  console.log(target);
  const copy = () => {
    try {
      target.current.select();
      document.execCommand('copy');
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    }
  };

  return [success, copy];
};

export default useClipboard;
