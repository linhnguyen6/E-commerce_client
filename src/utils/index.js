import toastr from "toastr";

const checkStatus = (status, next) => {
  if (status === 200) {
    next();
  } else if (status === 201) {
    next();
  } else if (status === 400) {
    toastr.error("Bad Request");
  } else if (status === 401) {
    toastr.error("Forbidden");
  } else if (status === 404) {
    toastr.error("API Not Found");
  }
};

export const AUTH_ERROR_CORE = {
  "auth/email-already-in-use": "Email Already exist",
  "auth/invalid-email": "Invalid Email",
  "auth/wrong-password": "Wrong Password",
  "auth/captcha-check-failed": "Captcha Check Failed",
  "auth/internal-error": "Internal Error",
  "auth/null-user": "Email does not exist",
  "auth/user-not-found":"Email does not exist"
};

export default checkStatus;
