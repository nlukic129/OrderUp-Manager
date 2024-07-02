export const createError = (err: any) => {
  const error = new Error();

  if (err.response) {
    error.message = err.response.data.errors[0].msg;
  } else if (err.request) {
    error.message = "Network Error";
  } else {
    error.message = "Error was occurred!";
  }

  return error;
};
