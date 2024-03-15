import Axios from "../helpers/axios";
import { errorHandler } from "../helpers/errorHandler";
import { setUser } from "./userSlice";
import "react-toastify/dist/ReactToastify.css";

export const fetchUserDataRdx = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/user/findUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setUser(data.findUser));
    } catch (error) {
      // console.log(error)
      errorHandler(error);
    }
  };
};
