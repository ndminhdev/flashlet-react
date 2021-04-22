import { CREATE_COLLECTION } from '../constants/set';

const setReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COLLECTION:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default setReducer;
