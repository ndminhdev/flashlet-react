import { useState } from 'react';

const useOverlay = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return [show, toggleShow];
};

export default useOverlay;
