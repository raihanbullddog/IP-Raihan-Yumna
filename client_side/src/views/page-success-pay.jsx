import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../helpers/errorHandler";
import Axios from "../helpers/axios";

export default function SuccessPay() {
  let navigate = useNavigate();

  const handleUpgradeAcc = async () => {
    try {
      let { data } = await Axios({
        url: "/upgrade",
        method: "patch",
        data: {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    handleUpgradeAcc();
  }, []);
  return (
    <>
      <h1>Payment Success, redirecting to your home page.....</h1>
    </>
  );
}
