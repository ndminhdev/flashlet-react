import useStore from './useStore';

const useOverlay = () => {
  const { state } = useStore();
  const { signInOverlayShown, signUpOverlayShown } = state.ui;
  return { signInOverlayShown, signUpOverlayShown };
};

export default useOverlay;
