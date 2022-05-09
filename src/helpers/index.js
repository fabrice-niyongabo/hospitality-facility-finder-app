import { useDispatch } from "react-redux";
import { fetchFacility } from "../actions/facility";
import Axios from "axios";
import { toast } from "react-toastify";

//custom dispatcher hook
export const useLoadBasicData = () => {
  const dispatch = useDispatch();
  return (payload) => {
    dispatch(fetchFacility());
  };
};

export const handleAuthError = (error) => {
  if (error?.response?.status == 401) {
    window.location = "/logout";
  }
};

export const uploadImage = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    Axios.post(process.env.REACT_APP_BACKEND_FILE_UPLOAD_URL, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.type == "success") {
          resolve({ data: { fileName: res.data.fileName } });
        } else {
          reject(res.data.msg);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export const toastMessage = (type, message) => {
  if (type == "info") {
    toast.info(message);
  }
  if (type == "error") {
    toast.error(message);
  }
  if (type == "success") {
    toast.success(message);
  }
};

export const errorHandler = (error) => {
  if (error?.response?.data?.msg) {
    toastMessage("error", error.response.data.msg);
  } else {
    toastMessage("error", error.message);
  }
  handleAuthError(error);
};
