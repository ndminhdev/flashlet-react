const handleError = (err, actionToHandle, dispatch) => {
  let errMessage;

  if (err.response?.data) {
    errMessage = err.response.data.message;
  } else if (err.request) {
    errMessage =
      err.request.message ||
      err.request.statusText ||
      'Check your network and try again';
  } else {
    errMessage = err.message;
  }

  if (actionToHandle && !dispatch) {
    actionToHandle(errMessage);
  } else if (actionToHandle && dispatch) {
    actionToHandle(dispatch, errMessage);
  } else {
    console.error(errMessage);
  }
};

export default handleError;
