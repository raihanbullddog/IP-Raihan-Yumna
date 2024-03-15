import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customId = "custom-id-yes";

export const errorHandler = async (error, options) => {
  console.log(error, "ERROR HANDLER ERROR");
  let message = error.response?.data?.message || "Unhandled Server Error";
  let status = error.response?.status || "500";
  toast.error(`Error ${status}: ${message}`, {
    theme: "dark",
    toastId: customId,
  });
};
