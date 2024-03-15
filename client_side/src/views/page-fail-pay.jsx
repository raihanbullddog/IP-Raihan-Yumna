import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../helpers/errorHandler";

export default function FailedPay() {
  let navigate = useNavigate();

  const handleFailPay = async () => {
    try {
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    handleFailPay();
  }, []);

  return (
    <>
      <h1>
        Payment failed, redirecting to your home page....
      </h1>
    </>
  );
}
